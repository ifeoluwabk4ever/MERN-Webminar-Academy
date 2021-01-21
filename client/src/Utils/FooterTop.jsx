import React from 'react'
import { Container } from 'reactstrap'
import ContactDetails from '../Components/FooterDetails/ContactDetails'
import ContactForm from '../Components/FooterDetails/ContactForm'
import Services from '../Components/FooterDetails/Services'

const FooterTop = () => {
   return (
      <div className="footer-top">
         <div className="foot-opac">
            <Container className="py-5 text-white">
               <div className="footer-page">
                  <div>
                     <ContactDetails />
                  </div>
                  <div>
                     <Services />
                  </div>
                  <div>
                     <ContactForm />
                  </div>
               </div>
            </Container>
         </div>
      </div>
   )
}

export default FooterTop
