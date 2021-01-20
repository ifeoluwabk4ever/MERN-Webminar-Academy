import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


import { addFaculty } from '../../Data/Actions/FacultyAction'


const AddFaculty = ({ addFaculty, isValid, isValidAuth, isLoading }) => {

   let [data, setData] = useState({
      faculty_name: '',
      faculty_code: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackAddFac, setCallbackAddFac] = useState(false)

   let { faculty_name, faculty_code } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      addFaculty({ faculty_name, faculty_code })
      setCallbackAddFac(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         faculty_name: '',
         faculty_code: ''
      })
   }


   if (isValid && isValidAuth && callbackAddFac) {
      if (faculty_name !== '' && faculty_code !== '') {
         clearDefault()
      }
      return <Redirect to="/faculty/all-faculty-list" />
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Add Faculty</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Add Faculty Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="faculty_name"
                        placeholder="Faculty Name"
                        value={faculty_name}
                        onChange={textChange("faculty_name")}
                     />
                     <label htmlFor="faculty_name">Faculty Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="faculty_code"
                        placeholder="Faculty Code"
                        value={faculty_code}
                        onChange={textChange('faculty_code')}
                     />
                     <label htmlFor="faculty_code">Faculty Code:</label>
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
                        >Add faculty</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isValid: state.mainFaculty.isValid,
   isValidAuth: state.mainFaculty.isValidAuth,
   isLoading: state.mainFaculty.isLoading,
})

export default connect(mapStateToProps, { addFaculty })(AddFaculty)
