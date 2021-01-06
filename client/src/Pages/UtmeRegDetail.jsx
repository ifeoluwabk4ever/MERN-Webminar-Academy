import React from 'react'
import { connect } from 'react-redux'
import { Container, Card } from 'reactstrap'
import logo from '../Images/webminar1.jpg'


export let dateFormat = dob => {
   let val1 = new Date(dob)
   let utc2 = val1.toUTCString().substring(0, 16)
   return utc2
}


const UtmeRegDetail = ({ user }) => {
   return (
      <Container className="d-flex align-content-center justify-content-center my-5">
         <Card className="m-auto p-4 shadow user-detail">
            <div className="d-flex justify-content-center">
               <img src={logo} alt="logo" className="reg-logo" />
            </div>
            <h1 className="text-center text-uppercase">webminar academy</h1>
            <div className="text-center mb-4">
               <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
               <h5 className="text-uppercase text-decoration-underline">post utme slip</h5>
            </div>
            <div className="reg-info">
               <div>
                  <div className="row text-capitalize">
                     <p className="col">Name:</p>
                     <h6 className="col">{user.fullName}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Email:</p>
                     <h6 className="col">{user.email}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Telephone Number:</p>
                     <h6 className="col">{user.telephone}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Registration Number:</p>
                     <h6 className="col">{user.regID}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Passcode:</p>
                     <h6 className="col">{user.passcode}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Date of Birth:</p>
                     <h6 className="col">{dateFormat(user.dob)}</h6>
                  </div>
               </div>
               <div className="d-flex justify-content-end reg-info-div">
                  <img src={`./Images/${user.avatar}`} alt={user.firstName} className="reg-info-img" />
               </div>
            </div>
            {
               user.hadTest && (
                  <Container>
                     <hr />
                     <div className="d-flex justify-content-center flex-column text-center">
                        <h4>Test Score</h4>
                        <p className="score">{`${user.testScore.percentage}%`}</p>
                        <div>
                           {
                              user.testScore.isPassed ?
                                 <p>You passed your test, do well to complete your registration afterwards and submit every necessary details to the student affairs</p>
                                 :
                                 <p>Oops! You failed your exam, do try again next year</p>
                           }
                        </div>
                     </div>
                  </Container>
               )
            }
         </Card>
      </Container>
   )
}

const mapStateToProps = state => ({
   user: state.initReg.newUser
})

export default connect(mapStateToProps, null)(UtmeRegDetail)
