import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
   return (
      <div className="error-page container d-flex justify-content-center align-content-center">
         <div className="m-auto p-4">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to="/" className="btn btn-outline-success text-uppercase navList">return home</Link>
         </div>

      </div>
   )
}

export default ErrorPage
