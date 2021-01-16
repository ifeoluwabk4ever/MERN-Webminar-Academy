import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { DotLoader, MoonLoader } from 'react-spinners';
import { registerAcademicStaff } from '../../../Data/Actions/AcademicStaffAction';
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaTimes } from 'react-icons/all'


const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   telephone: '',
   department: '',
   dob: '',
   password: ''
}

const AcademicStaffRegister = ({ isAcadStaff, isLoading, registerAcademicStaff, departments }) => {

   const [data, setData] = useState(initialState);
   const { firstName, lastName, email, telephone, dob, department, password } = data

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
   let [callbackAcadSR, setCallbackAcadSR] = useState(false)
   let [avatar, setAvatar] = useState('')

   let styleUpload = {
      display: images ? "block" : "none"
   }

   let handleProfileUpload = async e => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024) return toast.error("File size too large, ~= 1mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         avatar = new FormData()
         avatar.append('avatar', file)

         setLoading(true)
         const res = await axios.post(`/webminar/upload/profile-picture`, avatar, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         setLoading(false)
         setImages(res.data.msg);
         setAvatar(res.data.msg.avatar)
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleProfileDestroy = async () => {
      try {

         setLoading(true)
         let res = await axios.post(`/webminar/destroy/profile-picture`, { avatar_path: `./Public/Images/${avatar}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setAvatar('avatar3.jpg')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleSubmit = async e => {
      e.preventDefault()
      registerAcademicStaff({ firstName, lastName, email, telephone, dob, avatar, department, password })

      setCallbackAcadSR(true)
   }
   let clearDefault = () => {
      setData({
         ...data,
         firstName: '',
         lastName: '',
         email: '',
         telephone: '',
         department: '',
         dob: ''
      });
      setAvatar('')
   }

   useEffect(() => {
      if (isAcadStaff && callbackAcadSR) {
         clearDefault();
      }
   }, [callbackAcadSR])

   if (isAcadStaff && callbackAcadSR) {
      return <Redirect to="/academic-staff-profile-page" />
   }


   return (
      <div className="py-5 reg-form m-auto">
         <h1 className="text-center text-uppercase mb-3">Registration form</h1>
         <div>
            <div className="upload upload2 col-4 mx-auto position-relative p-2">
               <input
                  className="upload-file upload-file2"
                  type="file"
                  id="file_up"
                  name="file"
                  onChange={handleProfileUpload}
               />
               {
                  loading ?
                     <div className="file_img file_img2 d-flex align-items-center justify-content-center">
                        <DotLoader color="#198754" size={24} />
                     </div>
                     : <div className="file_img file_img2" style={styleUpload}>
                        <img src={images ? `/Images/${avatar}` : ''} alt="profile_picture" />
                        <div className="faTimes" onClick={handleProfileDestroy}>
                           <FaTimes color="red" size={20} />
                        </div>
                     </div>
               }
            </div>
         </div>
         <form className="p-4 shadow" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
               <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your FirstName here"
                  className="form-control"
                  value={firstName}
                  onChange={handleDataChange("firstName")}
               />
               <label htmlFor="firstName" className="text-capitalize">FirstName:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Your Surname here"
                  className="form-control"
                  value={lastName}
                  onChange={handleDataChange("lastName")}
               />
               <label htmlFor="lastName" className="text-capitalize">surname:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email here"
                  className="form-control"
                  value={email}
                  onChange={handleDataChange("email")}
               />
               <label htmlFor="email" className="text-capitalize">email:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="password"
                  className="form-control text-black"
                  id="password"
                  placeholder="******"
                  value={password}
                  onChange={handleDataChange('password')}
               />
               <label htmlFor="password">Password:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="tel"
                  name="telephone"
                  id="telephone"
                  placeholder="Your telephone here"
                  className="form-control"
                  value={telephone}
                  onChange={handleDataChange("telephone")}
               />
               <label htmlFor="telephone" className="text-capitalize">telephone:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Your dob here"
                  className="form-control"
                  value={dob}
                  onChange={handleDataChange("dob")}
               />
               <label htmlFor="dob" className="text-capitalize">date of birth:</label>
            </div>
            <div className="form-floating mb-3">
               <select
                  name="department"
                  id="department"
                  value={department}
                  onChange={handleDataChange("department")}
                  className="form-select text-black"
               >
                  <option value="">Choose your department here</option>
                  {
                     departments.map(item => (
                        <option key={item._id} value={item._id}>{item.department}</option>
                     ))
                  }
               </select>
            </div>
            {
               isLoading ?
                  <div className="my-3">
                     <MoonLoader size={32} color='#198754' />
                  </div>
                  :
                  <button
                     type="submit"
                     className="btn btn-success my-3 px-4 text-capitalize"
                  >submit</button>
            }
         </form>
      </div>
   )
}

const mapStateToProps = state => ({
   isAcadStaff: state.mainAcadStaff.isAcadStaff,
   isLoading: state.mainAcadStaff.isLoading,
   departments: state.mainDepartment.department
})


export default connect(mapStateToProps, { registerAcademicStaff })(AcademicStaffRegister)
