import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import logo from '../Images/webminar1.jpg'


import { dateFormat } from './UtmeRegDetail'
import Loading from '../Utils/Loading'


const StudentProfilePage = ({ user, isLoading }) => {

   isLoading && <Loading />


   return (
      <Container className="d-flex align-content-center justify-content-center my-5">
         <div className="m-auto p-4 shadow user-detail">
            <div className="d-flex justify-content-center">
               <img src={logo} alt="logo" className="reg-logo" />
            </div>
            <h1 className="text-center text-uppercase">webminar academy</h1>
            <div className="text-center mb-4">
               <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
               <h5 className="text-uppercase text-decoration-underline">student bio-Data</h5>
            </div>
            <div className="reg-info">
               <div>
                  <div className="row text-capitalize">
                     <p className="col">Name:</p>
                     <h6 className="col">{user.fullName}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Email:</p>
                     <h6 className="col">{user.schoolMail}</h6>
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
                     <p className="col">Matriculation Number:</p>
                     <h6 className="col">{user.matricNo}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Date of Birth:</p>
                     <h6 className="col">{dateFormat(user.dob)}</h6>
                  </div>
                  <div className="row">
                     <p className="col">Level:</p>
                     <h6 className="col">{`${user.level}00 level`}</h6>
                  </div>
               </div>
               <div className="d-flex justify-content-end reg-info-div">
                  <img src={`./Images/${user.avatar}`} alt={user.firstName} className="reg-info-img" />
               </div>
            </div>
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   user: state.mainStudent.student
})

export default connect(mapStateToProps, null)(StudentProfilePage)
