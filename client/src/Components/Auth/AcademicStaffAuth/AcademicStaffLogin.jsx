import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { loginAcademicStaff } from '../../../Data/Actions/AcademicStaffAction'


const AcademicStaffLogin = ({ loginAcademicStaff, isAcadStaff, isLoading }) => {

   let [data, setData] = useState({
      staffID: '',
      password: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackAcadSL, setCallbackAcadSL] = useState(false)

   let { staffID, password } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      loginAcademicStaff({ staffID, password })

      setCallbackAcadSL(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         staffID: '',
         password: ''
      })
   }

   useEffect(() => {
      if (isAcadStaff && callbackAcadSL) {
         clearDefault()
      }
   }, [callbackAcadSL])


   if (isAcadStaff) {
      if (modal) {
         toggle()
      }
   }

   if (isAcadStaff && callbackAcadSL) {
      return <Redirect to="/academic-staff-profile-page" />
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Login</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Login Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="staffID"
                        placeholder="Your matric number"
                        value={staffID}
                        onChange={textChange("staffID")}
                     />
                     <label htmlFor="staffID">StaffID:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={textChange('password')}
                     />
                     <label htmlFor="password">Password:</label>
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
                        >Login</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isAcadStaff: state.mainAcadStaff.isAcadStaff,
   isLoading: state.mainAcadStaff.isLoading,
})

export default connect(mapStateToProps, { loginAcademicStaff })(AcademicStaffLogin)
