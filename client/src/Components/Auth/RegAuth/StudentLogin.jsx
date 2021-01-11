import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { loginNewNormalUser } from '../../../Data/Actions/InitRegAction'


const StudentLogin = ({ loginNewNormalUser, isRegID, isLoading }) => {

   let [data, setData] = useState({
      regID: '',
      passcode: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackPSL, setCallbackPSL] = useState(false)

   let { regID, passcode } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let toggle = () => {
      setModal(!modal)
   }

   let handleSubmitNormalLogin = async e => {
      e.preventDefault()
      loginNewNormalUser({ regID, passcode })

      setCallbackPSL(true)
   }

   useEffect(() => {
      if (isRegID && callbackPSL) {
         setData({
            ...data,
            regID: '',
            passcode: ''
         })
      }
   }, [callbackPSL])


   if (isRegID) {
      if (modal) {
         toggle()
      }
   }

   if (isRegID && callbackPSL) {
      return <Redirect to="/new-student-post-utme-detail" />
   }




   return (
      <div>
         <NavLink onClick={toggle} href='#'>Login</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Login Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmitNormalLogin}>
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
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID,
   isLoading: state.initReg.isLoading,
})

export default connect(mapStateToProps, { loginNewNormalUser })(StudentLogin)
