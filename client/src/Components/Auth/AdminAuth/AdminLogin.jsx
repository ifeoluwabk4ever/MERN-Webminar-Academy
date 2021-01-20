import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { loginAdmin } from '../../../Data/Actions/AdminActions'


const AdminLogin = ({ loginAdmin, isAdmin, isLoading }) => {

   let [data, setData] = useState({
      adminID: '',
      password: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackAdminSL, setCallbackAdminSL] = useState(false)

   let { adminID, password } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      loginAdmin({ adminID, password })

      setCallbackAdminSL(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         adminID: '',
         password: ''
      })
   }

   useEffect(() => {
      if (isAdmin && callbackAdminSL) {
         clearDefault()
      }
   }, [callbackAdminSL])


   if (isAdmin) {
      if (modal) {
         toggle()
      }
   }

   if (isAdmin && callbackAdminSL) {
      return <Redirect to="/admin/dashboard" />
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Admin Login</NavLink>
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
                        id="adminID"
                        placeholder="Your matric number"
                        value={adminID}
                        onChange={textChange("adminID")}
                     />
                     <label htmlFor="adminID">AdminID:</label>
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
   isAdmin: state.mainAdmin.isAdmin,
   isLoading: state.mainAdmin.isLoading,
})

export default connect(mapStateToProps, { loginAdmin })(AdminLogin)
