import React, { Fragment, useState } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'


import Logout from './Logout'
import logo from '../Images/webminar1.png'




const Headers = ({ isRegID }) => {
   const [isOpen, setIsOpen] = useState(false)


   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const mainLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/about-us">about us</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/contact-us">contact us</NavLink>
         </NavItem>
      </Fragment>
   )

   const authLinks = (
      <Fragment>
         <NavItem className="text-white-50 animate2 navList">
            <Logout />
         </NavItem>
      </Fragment>
   )


   return (
      <Navbar expand="lg" color="success" dark sticky="top" className="shadow">
         <Container>
            <NavbarToggler onClick={toggle} />
            <div className="d-flex align-items-center">
               <NavbarBrand href="/" className="navList animate2 text-uppercase text-white-50">
                  <img src={logo} alt="logo" className="webminar-logo" />
               </NavbarBrand>
               <NavbarBrand href="/" className="navList animate2 text-uppercase text-white-50">webminar</NavbarBrand>
            </div>
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar>
                  {mainLinks} {isRegID && authLinks}
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   )
}

const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID
})

export default connect(mapStateToProps, null)(Headers)
