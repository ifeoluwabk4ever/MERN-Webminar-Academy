import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
   return (
      <Fragment>
         <h2 className="mb-4">Quick Links</h2>
         <ul className="list-group list-group-flush footer-links">
            <li className="list-unstyled text-capitalize mb-2">
               <Link to="/" className="text-decoration-none">home</Link>
            </li>
            <li className="list-unstyled my-2 text-capitalize">
               <Link to="/about-us" className="text-decoration-none">about us</Link>
            </li>
            <li className="list-unstyled my-2 text-capitalize">
               <Link to="/top-news" className="text-decoration-none">news</Link>
            </li>
            <li className="list-unstyled mt-2 text-capitalize">
               <Link to="/contact-us" className="text-decoration-none">contact us</Link>
            </li>
         </ul>
      </Fragment>
   )
}

export default Services
