import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


import { addDepartment } from '../../Data/Actions/DepartmentAction'


const AddDepartment = ({ addDepartment, isValid, isValidAuth, isLoading, faculties }) => {

   let [data, setData] = useState({
      course: '',
      faculty: '',
      course_code: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackAddDept, setCallbackAddDept] = useState(false)

   let { course, course_code, faculty } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      addDepartment({ course, course_code, faculty })
      setCallbackAddDept(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         course: '',
         faculty: '',
         course_code: ''
      })
   }


   if (isValid && isValidAuth && callbackAddDept) {
      if (course !== '' && course_code !== '') {
         clearDefault()
      }
      return <Redirect to="/department/all-department-list" />
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Add Department</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Add Department Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="course"
                        placeholder="Department Name"
                        value={course}
                        onChange={textChange("course")}
                     />
                     <label htmlFor="course">Course Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="course_code"
                        placeholder="Department Code"
                        value={course_code}
                        onChange={textChange('course_code')}
                     />
                     <label htmlFor="course_code">Department Code:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        name="faculty"
                        id="faculty"
                        value={faculty}
                        onChange={textChange("faculty")}
                        className="form-select text-black"
                     >
                        <option value="">Choose faculty here</option>
                        {
                           faculties.map(item => (
                              <option key={item._id} value={item._id}>{item.faculty_name}</option>
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
                        >Add department</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isValid: state.mainDepartment.isValid,
   isValidAuth: state.mainDepartment.isValidAuth,
   faculties: state.mainFaculty.faculty,
   isLoading: state.mainDepartment.isLoading,
})

export default connect(mapStateToProps, { addDepartment })(AddDepartment)
