import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { registerMainStudent } from '../../../Data/Actions/FinalRegAction'
import { toast } from 'react-toastify'


const MainStudentRegister = ({ registerMainStudent, isValidStudent, isLoading }) => {

   let [data, setData] = useState({
      isDE: false,
      password: '',
      confirmPassword: ''
   })
   let [modal, setModal] = useState(false)
   let [callbackMSR, setCallbackMSR] = useState(false)

   let { isDE, password, confirmPassword } = data

   let textChange = e => {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      setData({ ...data, [name]: value })
   }

   let handleSubmit = async e => {
      e.preventDefault()
      if (password.length < 6) return toast.error("Password weak")
      if (password !== confirmPassword) return toast.error("Password do not match")

      registerMainStudent({ password, isDE })

      setCallbackMSR(true)
   }

   let toggle = () => {
      setModal(!modal)
   }
   let clearDefault = () => {
      setData({
         ...data,
         isDE: false,
         password: '',
         confirmPassword: ''
      })
   }
   useEffect(() => {
      if (isValidStudent && callbackMSR) {
         clearDefault();
      }
   }, [callbackMSR])


   if (isValidStudent) {
      if (modal) {
         toggle()
      }
   }

   if (isValidStudent && callbackMSR) {
      return <Redirect to="/student-profile-page" />
   }


   return (
      <div>
         <NavLink onClick={toggle} href='#'>Register as student</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Register Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="password"
                        name="password"
                        placeholder="******"
                        value={password}
                        onChange={textChange}
                     />
                     <label htmlFor="password">Password:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="******"
                        value={confirmPassword}
                        onChange={textChange}
                     />
                     <label htmlFor="confirmPassword">Confirm Password:</label>
                  </div>
                  <div className="form-check mb-3">
                     <input
                        type="checkbox"
                        name="isDE"
                        className="text-black form-check-input mr-3 form-control"
                        id="isDE"
                        checked={isDE}
                        onChange={textChange}
                     />
                     <label htmlFor="isDE" className="form-check-label">Direct Entry?</label>
                  </div>
                  {
                     isLoading ?
                        <div className="my-3">
                           <MoonLoader size={32} color='#198754' />
                        </div>
                        :
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

export default connect(mapStateToProps, { registerMainStudent })(MainStudentRegister)
