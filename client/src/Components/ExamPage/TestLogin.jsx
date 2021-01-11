import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


import { loginNewPostUtmeUser } from '../../Data/Actions/InitRegAction'
import { FadeLoader } from 'react-spinners'

const TestLogin = ({ loginNewPostUtmeUser, isRegID, isLoading }) => {
   const [callbackTest, setCallbackTest] = useState(false);
   const [data, setData] = useState({
      regID: '',
      passcode: ''
   })
   const { regID, passcode } = data

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

   const handleSubmitTestLogin = async e => {
      e.preventDefault()
      loginNewPostUtmeUser({ regID, passcode })

      setCallbackTest(true)

   }

   useEffect(() => {
      if (isRegID && callbackTest) {
         setData({
            ...data,
            regID: '',
            passcode: ''
         })
      }
   }, [callbackTest])

   if (isRegID && callbackTest) {
      return <Redirect to="/new-student-preview" />
   }


   return (
      <div className="d-flex justify-content-center align-items-center test-login">
         <div className="m-auto">
            <form className="shadow p-4" onSubmit={handleSubmitTestLogin}>
               <div>
                  <h3 className="text-uppercase text-center mb-3">Test login page</h3>
                  <p className="text-muted mb-5">Please supply the registration number and passcode in your slip in the space provided below...</p>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     name="regID"
                     className="form-control"
                     placeholder="Please suppy your registration number here"
                     value={regID}
                     onChange={handleDataChange("regID")}
                  />
                  <label htmlFor="regID">Registration Number</label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="password"
                     name="passcode"
                     className="form-control"
                     placeholder="Please suppy your passcode here"
                     value={passcode}
                     onChange={handleDataChange("passcode")}
                  />
                  <label htmlFor="passcode">Passcode</label>
               </div>
               {
                  isLoading ?
                     <div className="my-3">
                        <FadeLoader color='#198754' />
                     </div>
                     :
                     <button
                        type="submit"
                        className="btn btn-success my-3 px-4 text-capitalize navList"
                     >login</button>
               }
            </form>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   isRegID: state.initReg.isRegID,
   isLoading: state.initReg.isLoading
})

export default connect(mapStateToProps, { loginNewPostUtmeUser })(TestLogin)