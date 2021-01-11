import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { loginMainStudent } from '../../../Data/Actions/FinalRegAction'


const MainStudentLogin = ({ loginMainStudent, isValidStudent, isLoading }) => {

   let [data, setData] = useState({
      matricNo: '',
      password: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackMSL, setCallbackMSL] = useState(false)

   let { matricNo, password } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      loginMainStudent({ matricNo, password })

      setCallbackMSL(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         matricNo: '',
         password: ''
      })
   }

   useEffect(() => {
      if (isValidStudent && callbackMSL) {
         clearDefault()
      }
   }, [callbackMSL])


   if (isValidStudent) {
      if (modal) {
         toggle()
      }
   }

   if (isValidStudent && callbackMSL) {
      return <Redirect to="/student-profile-page" />
   }

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
                        id="matricNo"
                        placeholder="Your matric number"
                        value={matricNo}
                        onChange={textChange("matricNo")}
                     />
                     <label htmlFor="matricNo">Matric Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={textChange('password')}
                     />
                     <label htmlFor="password">Password:</label>
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
   isValidStudent: state.mainStudent.isValidStudent,
   isLoading: state.mainStudent.isLoading,
})

export default connect(mapStateToProps, { loginMainStudent })(MainStudentLogin)
