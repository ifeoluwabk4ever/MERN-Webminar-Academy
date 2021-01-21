import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { BarLoader, PulseLoader } from 'react-spinners'
import axios from 'axios'


import logo from '../Images/webminar1.jpg'
import { dateFormat } from './UtmeRegDetail'
import Loading from '../Utils/Misc/Loading'
import { getAge } from './AcadStaffProfilePage'
import { getUserCourse } from '../Data/Actions/CoursesAction'
import { loadMainStudent } from '../Data/Actions/FinalRegAction'
import { toast } from 'react-toastify'


// get all unique values
export const getUnique = (items, value) => {
   return [...new Set(items.map(item => item[value]))];
};

const initialState = {
   level: '',
   semester: ''
}

const StudentProfilePage = ({ user, isLoading, courses, getUserCourse, myCourses, isMyCourses, isLoading2, loadMainStudent }) => {
   const [courseReg, setCourseReg] = useState(false);
   const [semesterReg, setSemesterReg] = useState(false);
   const [loading, setLoading] = useState(false);
   const [total, setTotal] = useState(0);
   const [myCourseList, setMyCourseList] = useState([]);
   const [state, setState] = useState(initialState);

   isLoading && <Loading />
   useEffect(() => {
      let getTotal = () => {
         let total = myCourseList.reduce((acc, item) => {
            return acc + item.course_unit
         }, 0)
         setTotal(total)
      }
      getTotal()
   }, [myCourseList])
   let { level, semester } = state

   let handleDataChange = e => {
      const { name, value } = e.target;

      setState({
         ...state,
         [name]: value
      })
      setMyCourseList([])
   }

   const handleChecked = async (list, e) => {
      const target = e.target;
      const value = target.type === "checkbox" && target.checked;
      var check = myCourseList.every(item => {
         return item._id !== list._id
      })
      if (check && value) {
         setMyCourseList([{ ...list }, ...myCourseList])
      } else {
         setMyCourseList(myCourseList.filter(item => item._id !== list._id))
      }
   }
   // console.log(myCourseList)

   const handleSubmit = () => {
      getUserCourse({ level, semester })
   }

   const handleRegisterCourse = async () => {
      setLoading(true)
      try {
         let regDetail = {
            regDetail: {
               level: Number(level),
               semester
            }
         }
         let addCourse = [...myCourseList, regDetail]
         let res = await axios.patch('/webminar/full-student/register-course', {
            isCourseRegistered: true,
            courseRegistered: addCourse
         })
         setCourseReg(false)
         setSemesterReg(false)
         setMyCourseList([])
         setState({
            ...state,
            level: '',
            semester: ''
         })
         await loadMainStudent()
         setLoading(false)

         return toast.success(res.data.msg)

      } catch (error) {
         let errors = error.response.data.msg
         if (errors) toast.error(errors)
         setLoading(false)
      }
   }

   useEffect(() => {
      if (level !== '' && semester !== '') {
         handleSubmit()
      }
   }, [level, semester])

   let uniqueLevel = getUnique(courses, 'level')

   let uniqueSemester = getUnique(courses, 'semester')



   return (
      <Container className="d-flex align-content-center justify-content-center">
         <div className="m-auto p-4 shadow user-detail">
            <div className="d-flex justify-content-center">
               <img src={logo} alt="logo" className="reg-logo" />
            </div>
            <h1 className="text-center text-uppercase">webminar academy</h1>
            <h3 className="text-center text-success">{user.courses_name}</h3>
            <h6 className="text-center text-decoration-underline">{user.schoolMail}</h6>
            <div className="text-center mb-4">
               <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
               <h5 className="text-uppercase text-decoration-underline">student bio-Data</h5>
            </div>
            <div className="reg-info">
               <div>
                  <div className="row text-capitalize">
                     <p className="col text-capitalize">Name:</p>
                     <h6 className="col text-success">{user.fullName}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Telephone Number:</p>
                     <h6 className="col text-success">{user.telephone}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Matriculation Number:</p>
                     <h6 className="col text-success">{user.matricNo}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Date of Birth:</p>
                     <h6 className="col text-success">{dateFormat(user.dob)}, ({getAge(user.dob)})</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Level:</p>
                     <h6 className="col text-success">{`${user.level}00 level`}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">course registration</p>
                     <div className="col text-capitalize">
                        <div className="d-flex place-items-center">
                           {
                              !user.isCourseRegistered ?
                                 <h6
                                    className="list-group-item-danger px-2 py-1"
                                    onClick={() => setCourseReg(true)}
                                    style={{ cursor: 'pointer' }}
                                 >Register Course</h6>
                                 :
                                 <h6 className="list-group-item-success px-2 py-1">Course Registered</h6>
                           }</div>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-end reg-info-div">
                  <img src={`./Images/${user.avatar}`} alt={user.firstName} className="reg-info-img" />
               </div>
            </div>
            {courseReg &&
               <div className="mt-4">
                  <h4 className="text-capitalize mb-2">Course registration process...</h4>
                  <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                     <div className="form-floating">
                        <select
                           name="level"
                           id="level"
                           value={level}
                           className="form-select"
                           onChange={(e) => {
                              handleDataChange(e)
                              setSemesterReg(true)
                           }}
                        >
                           <option value="">Choose level</option>
                           {
                              uniqueLevel.map((item, index) => (
                                 <option value={item} key={index}>
                                    {item}00 level
                                 </option>
                              ))
                           }
                        </select>
                        <label htmlFor="level" id="level">Level</label>
                     </div>
                     {semesterReg &&
                        <div className="form-floating mx-3">
                           <select
                              name="semester"
                              id="semester"
                              value={semester}
                              className="form-select"
                              onChange={handleDataChange}
                           >
                              <option value="">Choose Semester</option>
                              {
                                 uniqueSemester.map((item, index) => (
                                    <option value={item} key={index}>
                                       {item} Semester
                                    </option>
                                 ))
                              }
                           </select>
                           <label htmlFor="semester" id="semester">Semester</label>
                        </div>
                     }
                     {isLoading2 ?
                        <div style={{ display: 'grid', placeItems: 'center' }}>
                           <BarLoader color="#198754" />
                        </div> : null
                     }
                  </form>
                  {isMyCourses &&
                     <div className="mt-4" style={{ fontSize: '0.8rem' }}>
                        <div className="row text-center border py-1">
                           <h6 className="col text-uppercase my-auto">s/n</h6>
                           <h6 className="col text-uppercase my-auto">course code</h6>
                           <h6 className="col text-uppercase my-auto">course title</h6>
                           <h6 className="col text-uppercase my-auto">course unit(s)</h6>
                        </div>
                        {
                           myCourses.map((item, index) => (
                              <div key={item._id} className={`row text-center border py-1 ${myCourseList.find(list => list._id === item._id) ? 'text-black list-group-item-secondary' : 'text-muted'}`}>
                                 <div className="col text-uppercase my-auto">
                                    <div className="d-flex justify-content-center align-content-center my-auto">
                                       <input
                                          type="checkbox"
                                          name="addMyCourse"
                                          id="addMyCourse"
                                          onChange={e => handleChecked(item, e)}
                                          className="form-check mr-3"
                                       />
                                       <p>{index + 1}</p>
                                    </div>
                                 </div>
                                 <div className="col text-uppercase my-auto">{item.course_code}</div>
                                 <div className="col text-uppercase my-auto">{item.course_title}</div>
                                 <div className="col text-uppercase my-auto">{item.course_unit}</div>
                              </div>
                           ))
                        }
                        <div className="row border text-right py-2">
                           <h6 className="my-auto text-capitalize">Total Units: {total}</h6>
                           <div className="d-flex justify-content-end">
                              {loading ?
                                 <div style={{ display: 'grid', placeItems: 'center' }}>
                                    <PulseLoader color="#198754" />
                                 </div>
                                 :
                                 Number(total) >= 18 && Number(total) <= 28 ? <button
                                    type="submit"
                                    className="btn btn-success my-3"
                                    onClick={handleRegisterCourse}
                                 >Register</button>
                                    :
                                    <button
                                       type="submit"
                                       disabled
                                       className="btn btn-success my-3"
                                       onClick={handleRegisterCourse}
                                    >Register</button>
                              }
                           </div>
                        </div>
                     </div>
                  }
               </div>
            }
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   user: state.mainStudent.student,
   isLoading: state.mainStudent.isLoading,
   isLoading2: state.mainCourses.isLoading,
   courses: state.mainCourses.courses,
   myCourses: state.mainCourses.myCourse,
   isMyCourses: state.mainCourses.isMyCourse
})

export default connect(mapStateToProps, { getUserCourse, loadMainStudent })(StudentProfilePage)
