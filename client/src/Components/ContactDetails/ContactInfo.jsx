import React from 'react'
import { BiEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/all'
import Underline from '../../Utils/Misc/Underline'

const ContactInfo = () => {
   return (
      <div className="contact-info">
         <h3 className="text-capitalize">contact <span className="title-color">information</span></h3>
         <Underline />
         <div className="row place-items-center my-4">
            <div className="col-4">
               <FaMapMarkerAlt size={30} color="#198754" />
            </div>
            <div className="col-8 text-center">
               <div>
                  <h5>Address:</h5>
                  <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
               </div>
            </div>
         </div>
         <hr />
         <div className="row place-items-center my-5">
            <div className="col-4">
               <FaPhoneAlt size={30} color="#198754" />
            </div>
            <div className="col-8 text-center">
               <div>
                  <h5>Phone:</h5>
                  <p className="text-dark">+234(0) 813 537 3695</p>
               </div>
            </div>
         </div>
         <hr />
         <div className="row place-items-center">
            <div className="col-4">
               <BiEnvelope size={30} color="#198754" />
            </div>
            <div className="col-8 text-center">
               <h5>Mail:</h5>
               <p className="text-dark">admin@webminar.edu.ng</p>
            </div>
         </div>
      </div>
   )
}

export default ContactInfo
