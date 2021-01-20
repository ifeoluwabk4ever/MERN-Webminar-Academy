import React, { Fragment, useState } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'


import Logout from './Logout'
import logo from '../Images/webminar1.png'
import AdminRegister from '../Components/Auth/AdminAuth/AdminRegister'




const Headers = ({ isRegID, isValidStudent, isAcadStaff, isAdmin }) => {
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
         { isAdmin &&
            <Fragment>
               <NavItem className="text-white-50 text-capitalize animate2 navList d-lg-none">
                  <NavLink href="/activity">activity</NavLink>
               </NavItem>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <AdminRegister />
               </NavItem>
            </Fragment>
         }
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
               <NavbarBrand href="/" className="navList animate2 text-uppercase text-white-50 d-none d-lg-block">webminar</NavbarBrand>
            </div>
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar>
                  {mainLinks} {isRegID || isValidStudent || isAcadStaff || isAdmin ? authLinks : null}
               </Nav>
            </Collapse>
            {
               isAdmin && <div className="d-flex place-items-center">
                  <h3 className="text-uppercase my-auto ml-lg-3 text-white-50 mr-auto">Admin</h3>
               </div>
            }
         </Container>
      </Navbar>
   )
}

const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID,
   isValidStudent: state.mainStudent.isValidStudent,
   isAcadStaff: state.mainAcadStaff.isAcadStaff,
   isAdmin: state.mainAdmin.isAdmin,
})

export default connect(mapStateToProps, null)(Headers)
