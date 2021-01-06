import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'


const SubmitModal = ({ score, questions, submitBtn, newUser, percentage }) => {

   let [modal, setModal] = useState(false)

   let toggle = () => {
      setModal(!modal)
   }

   return (
      <div>
         <Button
            onClick={() => {
               toggle()
               submitBtn()
            }}
            color="success"
            className="text-capitalize"
         >Click to see your result</Button>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> POST UTME Result </ModalHeader>
            <ModalBody>
               <div>
                  <div className="mb-4">
                     You scored {score} of {questions.length}
                  </div>
                  <div className="text-center">
                     {
                        percentage >= 70 ?
                           <div className="test-pass text-success p-3">
                              <p className="text-uppercase cong">congrats!!!</p>
                              <p>Your have: <span className="cong ml-2">{percentage}%</span></p>
                              <p>You passed your test, do well to complete your registration afterwards and submit every necessary details to the student affairs</p>
                           </div>
                           : <div className="test-fail text-danger p-3">
                              <p className="text-uppercase cong">failed!!!</p>
                              <p>Your have: <span className="cong ml-2">{percentage}%</span></p>
                              <p>Oops! You failed your exam, do try again next year</p>
                           </div>
                     }
                  </div>
               </div>
               <div className="my-3 d-flex">
                  <Link to="/new-student-post-utme-detail" className="btn btn-outline-success text-uppercase navList mx-auto">view your detail</Link>
               </div>
            </ModalBody>
         </Modal>
      </div>
   )
}
const mapStateToProps = state => ({
   newUser: state.initReg.newUser
})

export default connect(mapStateToProps, null)(SubmitModal)
