import React from 'react'
import { Container } from 'reactstrap'
import ContactForm from '../Components/ContactDetails/ContactForm'
import ContactInfo from '../Components/ContactDetails/ContactInfo'

const ContactPage = () => {
   return (
      <>
         <div className="contact-page d-flex justify-content-center align-content-center">
            <div className="m-auto p-4 opac">
               <h1 className="text-center text-capitalize my-4 text-white">contact <span className="title-color">us</span></h1>
            </div>
         </div>
         <Container>
            <hr />
            <div className="contact-details my-5">
               <ContactInfo />
               <ContactForm />
            </div>
         </Container>
      </>
   )
}

export default ContactPage
