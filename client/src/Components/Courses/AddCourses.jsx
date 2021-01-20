import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


import { addCourses } from '../../Data/Actions/CoursesAction'


const AddCourses = ({ addCourses, isValid, isValidAuth, isLoading, departments }) => {

   let [data, setData] = useState({
      course_title: '',
      department: '',
      course_code: '',
      course_unit: '',
      isFacultyCourse: false,
      isGeneralCourse: false,
      level: '',
      semester: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackAddCourse, setCallbackAddCourse] = useState(false)

   let { course_code, course_title, course_unit, isFacultyCourse, isGeneralCourse, level, department, semester } = data

   let textChange = name => e => {
      const target = e.target;
      console.log(target);
      const value = target.type === "checkbox" ? target.checked : target.value;
      setData({ ...data, [name]: value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      addCourses({ course_code, course_title, course_unit, isFacultyCourse, isGeneralCourse, level, department, semester })
      setCallbackAddCourse(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         course_title: '',
         department: '',
         course_code: '',
         course_unit: null,
         isFacultyCourse: false,
         isGeneralCourse: false,
         level: null,
         semester: ''
      })
   }


   if (isValid && isValidAuth && callbackAddCourse) {
      if (modal) { toggle() }
      if (course_title !== '' && course_code !== '') {
         clearDefault()
      }
      return <Redirect to="/courses/all-courses-list" />
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Add Course</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Add Course Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="course_title"
                        placeholder="Course Name"
                        value={course_title}
                        onChange={textChange("course_title")}
                     />
                     <label htmlFor="course_title">Course Name:</label>
                  </div>
                  <div className="d-flex justify-content-between modalName">
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control text-black"
                           id="course_code"
                           placeholder="Course Code"
                           value={course_code}
                           onChange={textChange('course_code')}
                        />
                        <label htmlFor="course_code">Course Code:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <select
                           name="course_unit"
                           id="course_unit"
                           value={course_unit}
                           onChange={textChange("course_unit")}
                           className="form-select text-black"
                        >
                           <option value="">Choose Course Unit here</option>
                           <option value={1}>1</option>
                           <option value={2}>2</option>
                           <option value={3}>3</option>
                           <option value={4}>4</option>
                           <option value={5}>5</option>
                        </select>
                     </div>
                  </div>
                  <div className="d-flex justify-content-between modalName">
                     <div className="form-floating mb-3">
                        <select
                           name="level"
                           id="level"
                           value={level}
                           onChange={textChange("level")}
                           className="form-select text-black"
                        >
                           <option value="">Choose Level here</option>
                           <option value={1}>1</option>
                           <option value={2}>2</option>
                           <option value={3}>3</option>
                           <option value={4}>4</option>
                           <option value={5}>5</option>
                        </select>
                     </div>
                     <div className="form-floating mb-3">
                        <select
                           name="semester"
                           id="semester"
                           value={semester}
                           onChange={textChange("semester")}
                           className="form-select text-black"
                        >
                           <option value="">Choose Semester here</option>
                           <option value="Rain">Rain</option>
                           <option value="Harmattan">Harmattan</option>
                        </select>
                     </div>
                  </div>
                  <div className="d-flex justify-content-between modalName">
                     <div className="form-check mb-3">
                        <input
                           type="checkbox"
                           name="isFacultyCourse"
                           className="text-black form-check-input mr-3 form-control"
                           id="isFacultyCourse"
                           checked={isFacultyCourse}
                           onChange={textChange("isFacultyCourse")}
                        />
                        <label htmlFor="isFacultyCourse" className="form-check-label">Faculty Course?</label>
                     </div>
                     <div className="form-check mb-3">
                        <input
                           type="checkbox"
                           name="isGeneralCourse"
                           className="text-black form-check-input mr-3 form-control"
                           id="isGeneralCourse"
                           checked={isGeneralCourse}
                           onChange={textChange("isGeneralCourse")}
                        />
                        <label htmlFor="isGeneralCourse" className="form-check-label">General Course?</label>
                     </div>
                  </div>
                  <div className="form-floating mb-3">
                     <select
                        name="department"
                        id="department"
                        value={department}
                        onChange={textChange("department")}
                        className="form-select text-black"
                     >
                        <option value="">Choose Department here</option>
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
                        >Add course</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isValid: state.mainCourses.isValid,
   isValidAuth: state.mainCourses.isValidAuth,
   departments: state.mainDepartment.department,
   isLoading: state.mainCourses.isLoading,
})

export default connect(mapStateToProps, { addCourses })(AddCourses)
