import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'


import StudentReg from './Components/Auth/StudentReg'
import Home from './Pages/Home'
import Headers from './Utils/Headers'
import ErrorPage from './Utils/ErrorPage'
import TestPage from './Components/ExamPage/TestPage'
import TestPreview from './Components/ExamPage/TestPreview'
import UtmeRegDetail from './Pages/UtmeRegDetail'
import TestLogin from './Components/ExamPage/TestLogin'

const Routes = ({ isAuth, isRegID }) => {
   return (
      <Router>
         <Headers />
         <ToastContainer />
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new-student-register" exact component={StudentReg} />
            <Route path="/new-student-preview" exact component={isRegID ? TestPreview : ErrorPage} />
            <Route path="/new-student-test" exact component={isRegID ? TestPage : ErrorPage} />
            <Route path="/new-student-test-login" exact component={TestLogin} />
            <Route path="/new-student-post-utme-detail" exact component={isAuth && isRegID ? UtmeRegDetail : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
      </Router>
   )
}

const mapStateToProps = state => ({
   isAuth: state.initReg.isAuthenticated,
   isRegID: state.initReg.isRegID
})

export default connect(mapStateToProps, null)(Routes)
