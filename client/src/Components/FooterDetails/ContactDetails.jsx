import React, { Fragment } from 'react'
import { BiEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/all'

const ContactDetails = () => {
   return (
      <Fragment>
         <h2 className="mb-4">Contact Detail</h2>
         <div className="row place-items-center">
            <div className="col-4">
               <FaMapMarkerAlt size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Address:</h3>
               <address>  P.M.B. 4000, Ilukuno Ekiti, Nigeria </address>
            </div>
         </div>
         <div className="row place-items-center my-3">
            <div className="col-4">
               <FaPhoneAlt size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Phone:</h3>
               <p>+234(0) 813 537 3695</p>
            </div>
         </div>
         <div className="row place-items-center">
            <div className="col-4">
               <BiEnvelope size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Mail:</h3>
               <p>admin@webminar.edu.ng</p>
            </div>
         </div>
      </Fragment>
   )
}

export default ContactDetails
