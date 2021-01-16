import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import logo from '../Images/webminar1.jpg'


import { dateFormat } from './UtmeRegDetail'
import Loading from '../Utils/Loading'
import { getAge } from './AcadStaffProfilePage'


const StudentProfilePage = ({ user, isLoading }) => {

   isLoading && <Loading />


   return (
      <Container className="d-flex align-content-center justify-content-center my-5">
         <div className="m-auto p-4 shadow user-detail">
            <div className="d-flex justify-content-center">
               <img src={logo} alt="logo" className="reg-logo" />
            </div>
            <h1 className="text-center text-uppercase">webminar academy</h1>
            <h3 className="text-center text-success">{user.department_name}</h3>
            <h6 className="text-center text-decoration-underline">{user.schoolMail}</h6>
            <div className="text-center mb-4">
               <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
               <h5 className="text-uppercase text-decoration-underline">student bio-Data</h5>
            </div>
            <div className="reg-info">
               <div>
                  <div className="row text-capitalize">
                     <p className="col text-capitalize">Name:</p>
                     <h6 className="col text-success">{user.fullName}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Telephone Number:</p>
                     <h6 className="col text-success">{user.telephone}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">UTME Registration Number:</p>
                     <h6 className="col text-success">{user.regID}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Matriculation Number:</p>
                     <h6 className="col text-success">{user.matricNo}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Date of Birth:</p>
                     <h6 className="col text-success">{dateFormat(user.dob)}, ({getAge(user.dob)})</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Course of study:</p>
                     <h6 className="col text-success">{user.course}</h6>
                  </div>
                  <div className="row">
                     <p className="col text-capitalize">Level:</p>
                     <h6 className="col text-success">{`${user.level}00 level`}</h6>
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
   user: state.mainStudent.student,
   isLoading: state.mainStudent.isLoading
})

export default connect(mapStateToProps, null)(StudentProfilePage)
