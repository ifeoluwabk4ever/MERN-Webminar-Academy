import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import StudentRetrieveID from './StudentRetrieveID'
import { Redirect } from 'react-router-dom'
// import { loginNewUser } from '../../Data/Actions/InitRegAction'


const StudentLogin = ({ loginNewUser, isAuth, isLoading }) => {

   let [data, setData] = useState({
      regID: '',
      passcode: ''
   })
   let [modal, setModal] = useState(false)

   let { regID, passcode } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      // loginNewUser({ regID, passcode })
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setInterval(() => {
         setData({
            ...data,
            regID: '',
            passcode: ''
         })
      }, 2000);
   }
   if (isAuth) {
      if (modal) {
         toggle()
      }
   }

   useEffect(() => {
      if (isAuth) {
         clearDefault();
         return <Redirect to="/" />
      }
   }, [isAuth])

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Login</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Login Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="regNumber"
                        placeholder="Your registration number"
                        value={regID}
                        onChange={textChange("regID")}
                     />
                     <label htmlFor="regNumber">Registration Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="passcode"
                        placeholder="******"
                        value={passcode}
                        onChange={textChange('passcode')}
                     />
                     <label htmlFor="passcode">Passcode:</label>
                  </div>
                  {
                     isLoading &&
                     <div className="my-3">
                        <MoonLoader size={32} color='#198754' />
                     </div>
                  }
                  {
                     !isLoading &&
                     <button
                        type="submit"
                        className="btn btn-success my-3 px-4 text-capitalize"
                     >Login</button>
                  }
                  <div className="d-flex justify-content-end">
                     <div className="text-capitalize d-flex align-items-center">forgotten ID?<StudentRetrieveID /></div>
                  </div>
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isAuth: state.initReg.isAuthenticated,
   isLoading: state.initReg.isLoading,
})

export default connect(mapStateToProps, null)(StudentLogin)
