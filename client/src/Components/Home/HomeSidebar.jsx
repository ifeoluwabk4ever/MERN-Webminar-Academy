import React from 'react'
import { NavLink } from 'reactstrap'
import StudentLogin from '../Auth/StudentLogin'
import StudentRetrieveID from '../Auth/StudentRetrieveID'

const HomeSidebar = () => {
   return (
      <div className="p-2 mt-3 overflow-auto">
         <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingOne">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                     new student
                  </button>
               </h2>
               <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <li className="list-group-item">
                           <NavLink href="/new-student-register">Register</NavLink>
                        </li>
                        <li className="list-group-item">
                           <StudentLogin />
                        </li>
                        <li className="list-group-item">
                           <StudentRetrieveID />
                        </li>
                        <li className="list-group-item">
                           <NavLink href="/new-student-payment">payment portal</NavLink>
                        </li>
                        <li className="list-group-item">
                           <NavLink href="/new-student-test-login">post UTME test</NavLink>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingTwo">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                     undergraduate
                  </button>
               </h2>
               <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-parent="#accordionFlushExample">
                  <div className="accordion-body">
                     <ul className="list-group list-group-flush text-capitalize">
                        <li className="list-group-item">Login</li>
                        <li className="list-group-item">Payment portal</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="accordion-item">
               <h2 className="accordion-header" id="flush-headingThree">
                  <button className="accordion-button collapsed text-capitalize" type="button" data-toggle="collapse" data-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                     staff
                  </button>
               </h2>
               <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-parent="#accordionFlushExample">
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
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HomeSidebar
