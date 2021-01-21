import React from 'react'
import { NavItem, NavLink } from 'reactstrap'


import AddCourses from '../Courses/AddCourses'
import AddDepartment from '../Department/AddDepartment'
import AddFaculty from '../Faculty/AddFaculty'



const HomeSidebar = () => {
   return (
      <div>
         <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingOne">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                     Faculty
                  </button>
               </h2>
               <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <NavItem className="list-group-item text-capitalize animate2">
                           <AddFaculty />
                        </NavItem>
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/faculty/all-faculty-list">all faculty</NavLink>
                        </NavItem>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingTwo">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                     Department
                  </button>
               </h2>
               <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <NavItem className="list-group-item text-capitalize animate2">
                           <AddDepartment />
                        </NavItem>
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/department/all-department-list">all department</NavLink>
                        </NavItem>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingThree">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                     Courses
                  </button>
               </h2>
               <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <NavItem className="list-group-item text-capitalize animate2">
                           <AddCourses />
                        </NavItem>
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/courses/all-courses-list">all courses</NavLink>
                        </NavItem>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingFour">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                     SUG
               </button>
               </h2>
               <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingFive">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                     recent news
               </button>
               </h2>
               <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/add-news">add news</NavLink>
                        </NavItem>
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/admin-top-news">Top news</NavLink>
                        </NavItem>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingSix">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                     feedbacks
            </button>
               </h2>
               <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <NavItem className="list-group-item text-capitalize animate2">
                           <NavLink href="/feedbacks/all-feedbacks">feedbacks</NavLink>
                        </NavItem>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HomeSidebar
