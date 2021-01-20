import React from 'react'
import { Navbar } from 'reactstrap'


const Footer = () => {
   return (
      <Navbar className="text-white-50 text-capitalize d-flex justify-content-center" dark color="dark">
         <p className="my-auto py-2">Webminar academy &copy; Copyright all reserved. <strong className="text-white text-italic">2020 - {new Date().getFullYear()}</strong></p>
      </Navbar>
   )
}

export default Footer

