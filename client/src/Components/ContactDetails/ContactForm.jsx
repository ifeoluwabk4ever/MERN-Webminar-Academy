import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MoonLoader } from 'react-spinners';


import { Underline1 } from '../../Utils/Misc/Underline';


const ContactForm = () => {
   const [data, setData] = useState({
      name: '',
      email: '',
      telephone: '',
      message: ''
   });
   const [loading, setLoading] = useState(false);

   let { name, email, telephone, message } = data

   const handleTextChange = input => e => {
      let { value } = e.target
      setData({ ...data, [input]: value })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)
      try {
         let feedback = { name, email, telephone, message }
         let res = await axios.post(`/webminar/all-feedback`, feedback)
         toast.success(res.data.msg)
         setData({
            name: '',
            email: '',
            telephone: '',
            message: ''
         })
         setLoading(false)
      } catch (error) {
         setLoading(false)
         let errors = error.response.data.msg
         if (errors) toast.error(errors)
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit} className="shadow px-5">
            <h3 className="text-capitalize text-center">Contact  <span className="title-color">form</span></h3>
            <Underline1 />
            <p className="text-muted my-4 text-right">Please drop a message for us...</p>
            <div className="form-floating mb-3 mt-4">
               <input
                  type="text"
                  className="form-control"
                  id="name1"
                  placeholder="Your name"
                  value={name}
                  onChange={handleTextChange("name")}
               />
               <label htmlFor="name1">Name:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="email"
                  className="form-control"
                  id="email1"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleTextChange("email")}
               />
               <label htmlFor="email1">Email address:</label>
            </div>
            <div className="form-floating mb-3">
               <input
                  type="tel"
                  className="form-control"
                  id="telephone1"
                  placeholder="+234(0)8135373695"
                  value={telephone}
                  onChange={handleTextChange("telephone")}
               />
               <label htmlFor="telephone1">Telephone Number:</label>
            </div>
            <div className="form-floating mb-3">
               <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  value={message}
                  style={{ resize: 'none', height: '10rem' }}
                  onChange={handleTextChange("message")}
                  id="message1"
               ></textarea>
               <label htmlFor="message1">Comments:</label>
            </div>
            {
               loading ? <MoonLoader size={32} color='#0d6efd' /> :
                  <button
                     type="submit"
                     className="btn btn-success my-3 px-4 text-capitalize"
                  >Send</button>
            }
         </form>
      </div>
   )
}

export default ContactForm
