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
import { getDepartment } from './Data/Actions/DepartmentAction'
import { getCourses } from './Data/Actions/CoursesAction'

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

function App() {

   useEffect(() => {
      store.dispatch(loadNewUser())
      store.dispatch(loadMainStudent())
      store.dispatch(loadAcademicStaff())
      store.dispatch(getDepartment())
      store.dispatch(getCourses())
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
