import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'


const StudentRetrieveID = ({ login, isAuth, isLoading }) => {

   let [email, setEmail] = useState('')
   let [modal, setModal] = useState(false)


   let handleSubmit = async e => {
      e.preventDefault()
   }

   let toggle = () => {
      setModal(!modal)
   }

   if (isAuth) {
      if (modal) {
         toggle()
      }
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#' className="text-capitalize">RetrieveID</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle} className="text-capitalize">retrieve ID Form</ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="email"
                        className="form-control text-black"
                        id="email"
                        placeholder="Your registration number"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                     <label htmlFor="email">Email address:</label>
                  </div>
                  <div className="border">
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
                     >get ID</button>
                  }
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

export default connect(mapStateToProps, null)(StudentRetrieveID)
