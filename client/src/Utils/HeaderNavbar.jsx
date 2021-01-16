import React from 'react'
import { Navbar, NavItem, NavLink } from 'reactstrap'
import AcademicStaffLogin from '../Components/Auth/AcademicStaffAuth/AcademicStaffLogin'
import MainStudentLogin from '../Components/Auth/MainStudentAuth/MainStudentLogin'
import MainStudentRegister from '../Components/Auth/MainStudentAuth/MainStudentRegister'
import StudentLogin from '../Components/Auth/RegAuth/StudentLogin'

const HeaderNavbar = () => {
   return (
      <Navbar className="py-0 header-navbar">
         <div className="btn-group w-100 text-center list-group list-group-horizontal">
            <div className="dropdown list-group-item flex-fill">
               <button className="btn dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  post UTME screening
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-register">Register for POST UTME</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <StudentLogin />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <MainStudentRegister />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-payment">payment portal</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-test-login">post UTME test</NavLink>
                  </NavItem>
               </ul>
            </div>
            <div className="dropdown list-group-item flex-fill">
               <button className="btn dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  undergraduate
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-register">Register</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <MainStudentLogin />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-payment">payment portal</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-test-login">post UTME test</NavLink>
                  </NavItem>
               </ul>
            </div>
            <div className="dropdown list-group-item flex-fill">
               <button className="btn dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  postgraduate
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-register">Register</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <StudentLogin />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-payment">payment portal</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-test-login">post UTME test</NavLink>
                  </NavItem>
               </ul>
            </div>
            <div className="dropdown list-group-item flex-fill">
               <button className="btn dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  staff
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/academic-staff-register">Register</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <AcademicStaffLogin />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-payment">payment portal</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-test-login">post UTME test</NavLink>
                  </NavItem>
               </ul>
            </div>
            <div className="dropdown list-group-item flex-fill">
               <button className="btn dropdown-toggle text-capitalize" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-expanded="false">
                  SUG
               </button>
               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-register">Register</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <StudentLogin />
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-payment">payment portal</NavLink>
                  </NavItem>
                  <NavItem className="text-capitalize animate2 dropdown-item">
                     <NavLink href="/new-student-test-login">post UTME test</NavLink>
                  </NavItem>
               </ul>
            </div>
         </div>
      </Navbar>
   )
}

export default HeaderNavbar
