import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'



import { registerAdmin } from '../../../Data/Actions/AdminActions';


const initialState = {
   firstName: '',
   lastName: '',
   email: '',
   telephone: '',
   department: '',
   dob: '',
   password: ''
}

const AdminRigister = ({ isAdmin, isLoading, registerAdmin }) => {

   const [data, setData] = useState(initialState);
   const { firstName, lastName, email, telephone, dob, department, password } = data

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

   let [modal, setModal] = useState(false)
   let [callbackAdminSR, setCallbackAdminSR] = useState(false)

   let toggle = () => {
      setModal(!modal)
   }

   let handleSubmit = async e => {
      e.preventDefault()
      registerAdmin({ firstName, lastName, email, telephone, dob, department, password })

      setCallbackAdminSR(true)
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
   }

   if (isAdmin) {
      if (modal) {
         toggle()
      }
   }

   useEffect(() => {
      if (isAdmin && callbackAdminSR) {
         clearDefault();
      }
   }, [callbackAdminSR])

   if (isAdmin && callbackAdminSR) {
      return <Redirect to="/admin/dashboard" />
   }


   return (
      <div>
         <NavLink onClick={toggle} href='#'>Admin Register</NavLink>
         <Modal isOpen={modal}>
            <ModalHeader toggle={toggle}> Registration Form </ModalHeader>
            <ModalBody>
               <form className="p-4 shadow" onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-between modalName">
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
                  {
                     isLoading ?
                        <div className="mt-3">
                           <MoonLoader size={32} color='#198754' />
                        </div>
                        :
                        <button
                           type="submit"
                           className="btn btn-success mt-3 px-4 text-capitalize"
                        >submit</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}

const mapStateToProps = state => ({
   isAdmin: state.mainAdmin.isAdmin,
   isLoading: state.mainAdmin.isLoading
})


export default connect(mapStateToProps, { registerAdmin })(AdminRigister)
