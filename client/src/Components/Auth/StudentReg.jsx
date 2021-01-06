import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { DotLoader, MoonLoader } from 'react-spinners';
import { registerNewUser } from '../../Data/Actions/InitRegAction';
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaTimes } from 'react-icons/all'


const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   telephone: '',
   dob: ''
}

const StudentReg = ({ isAuth, isLoading, registerNewUser }) => {

   const [data, setData] = useState(initialState);
   const { firstName, lastName, email, telephone, dob } = data

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
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
         const res = await axios.post(`/api/upload/profile-picture`, avatar, {
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
         let res = await axios.post(`/api/destroy/profile-picture`, { avatar_path: `./Public/Images/${avatar}` })

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
      registerNewUser({ firstName, lastName, email, telephone, dob, avatar })
   }
   let clearDefault = () => {
      setInterval(() => {
         setData({
            ...data,
            firstName: '',
            lastName: '',
            email: '',
            telephone: '',
            dob: ''
         });
         setAvatar('')
      }, 2000);
   }
   useEffect(() => {
      if (isAuth) {
         clearDefault();
      }
   }, [isAuth])

   if (isAuth) {
      return <Redirect to="/new-student-post-utme-detail" />
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
            {
               isLoading &&
               <div className="my-3">
                  <MoonLoader size={32} color='#198754' />
               </div>
            }
            {
               !isLoading &&
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
   isAuth: state.initReg.isAuthenticated,
   isLoading: state.initReg.isLoading
})


export default connect(mapStateToProps, { registerNewUser })(StudentReg)
