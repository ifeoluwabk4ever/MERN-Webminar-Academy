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

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

function App() {

   useEffect(() => {
      store.dispatch(loadNewUser())
   }, [])

   return (
      <Provider store={store}>
         <DataProvider>
            <Routes />
         </DataProvider>
      </Provider>
   );
}

export default App;