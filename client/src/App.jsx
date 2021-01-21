import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import $ from 'jquery'
import 'popper.js'
import 'react-toastify/dist/ReactToastify.css'



import './App.css';
import store from './Data/Store'
import DataProvider from './Data/Context'
import Routes from './Routes'
import setAuthToken from './Helpers/SetAuthToken'
import { loadNewUser } from './Data/Actions/InitRegAction'
import { loadMainStudent } from './Data/Actions/FinalRegAction'
import { loadAcademicStaff } from './Data/Actions/AcademicStaffAction'
import { loadAdmin } from './Data/Actions/AdminActions'
import { getDepartment } from './Data/Actions/DepartmentAction'
import { getFaculty } from './Data/Actions/FacultyAction'
import { getCourses } from './Data/Actions/CoursesAction'
import { getNews } from './Data/Actions/NewsAction'
import { getFeedback } from './Data/Actions/FeedbackAction'

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

function App() {

   useEffect(() => {
      store.dispatch(loadNewUser())
      store.dispatch(loadMainStudent())
      store.dispatch(loadAcademicStaff())
      store.dispatch(loadAdmin())
      store.dispatch(getDepartment())
      store.dispatch(getFaculty())
      store.dispatch(getCourses())
      store.dispatch(getNews())
      store.dispatch(getFeedback())
   }, [])

   return (
      <Provider store={store}>
         <DataProvider>
            <Routes />
         </DataProvider>
      </Provider>
   );
}


export default (App);
