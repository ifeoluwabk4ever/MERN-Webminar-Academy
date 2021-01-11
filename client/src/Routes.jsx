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

const Routes = ({ isRegID, isValidStudent, validStudent, newUser }) => {
   return (
      <Router>
         <HeaderNavbar />
         <Headers />
         <ToastContainer />
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new-student-register" exact component={StudentReg} />
            <Route path="/new-student-preview" exact component={isRegID ? TestPreview : ErrorPage} />
            <Route path="/new-student-test" exact component={isRegID ? TestPage : ErrorPage} />
            <Route path="/new-student-test-login" exact component={TestLogin} />
            <Route path="/new-student-post-utme-detail" exact component={isRegID ? UtmeRegDetail : ErrorPage} />
            <Route path="/student-profile-page" exact component={isValidStudent ? StudentProfilePage : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
      </Router>
   )
}

const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID,
   isValidStudent: state.mainStudent.isValidStudent,
})

export default connect(mapStateToProps, null)(Routes)
