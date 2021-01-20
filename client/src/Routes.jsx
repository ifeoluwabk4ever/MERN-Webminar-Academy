import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'


import StudentReg from './Components/Auth/RegAuth/StudentReg'
import Home from './Pages/Home'
import Headers from './Utils/Headers'
import ErrorPage from './Utils/ErrorPage'
import TestPage from './Components/ExamPage/TestPage'
import TestPreview from './Components/ExamPage/TestPreview'
import UtmeRegDetail from './Pages/UtmeRegDetail'
import TestLogin from './Components/ExamPage/TestLogin'
import HeaderNavbar from './Utils/HeaderNavbar'
import StudentProfilePage from './Pages/StudentProfilePage'
import AcadStaffProfilePage from './Pages/AcadStaffProfilePage'
import AcademicStaffReg from './Components/Auth/AcademicStaffAuth/AcademicStaffReg'
import Footer from './Utils/Footer'
import HomeSidebar from './Components/Home/HomeSidebar'
import FacultyPage from './Pages/Screens/FacultyPage'
import DepartmentPage from './Pages/Screens/DepartmentPage'
import CoursesPage from './Pages/Screens/CoursesPage'

const Routes = ({ isRegID, isValidStudent, isAcadStaff, isAdmin }) => {
   return (
      <Router>
         {!isAdmin && <HeaderNavbar />}
         <Headers />
         <ToastContainer />
         <div className={`${isAdmin ? 'home-panel-admin' : ''}`}>
            {
               isAdmin && <div className="d-lg-block d-none sideRight overflow-auto">
                  <HomeSidebar />
               </div>
            }
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/new-student-register" exact component={StudentReg} />
               <Route path="/academic-staff-register" exact component={AcademicStaffReg} />
               <Route path="/new-student-preview" exact component={isRegID ? TestPreview : ErrorPage} />
               <Route path="/new-student-test" exact component={isRegID ? TestPage : ErrorPage} />
               <Route path="/new-student-test-login" exact component={TestLogin} />
               <Route path="/new-student-post-utme-detail" exact component={isRegID ? UtmeRegDetail : ErrorPage} />
               <Route path="/student-profile-page" exact component={isValidStudent ? StudentProfilePage : ErrorPage} />
               <Route path="/academic-staff-profile-page" exact component={isAcadStaff ? AcadStaffProfilePage : ErrorPage} />
               <div className={`${isAdmin ? 'panel-sidebar' : ''}`}>
                  <div className="ml-lg-3">
                     <Route path="/activity" exact component={isAdmin ? HomeSidebar : ErrorPage} />
                     <Route path="/admin/dashboard" exact component={isAdmin ? AcadStaffProfilePage : ErrorPage} />
                     <Route path="/faculty/all-faculty-list" exact component={isAdmin ? FacultyPage : ErrorPage} />
                     <Route path="/department/all-department-list" exact component={isAdmin ? DepartmentPage : ErrorPage} />
                     <Route path="/courses/all-courses-list" exact component={isAdmin ? CoursesPage : ErrorPage} />
                  </div>
               </div>
               <Route component={ErrorPage} />
            </Switch>
         </div>
         <Footer />
      </Router>
   )
}

const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID,
   isValidStudent: state.mainStudent.isValidStudent,
   isAdmin: state.mainAdmin.isAdmin,
   isAcadStaff: state.mainAcadStaff.isAcadStaff
})

export default connect(mapStateToProps, null)(Routes)
