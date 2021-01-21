import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Card, CardBody, CardFooter, CardHeader, Container } from 'reactstrap'


import { Loader1 } from '../../Utils/Misc/Loading'
import { dateFormat } from '../../Pages/UserInfo'
import { Underline1 } from '../../Utils/Misc/Underline'

const UsersFeedback = () => {
   const [allFeedbacks, setAllFeedbacks] = useState([]);
   const [loading, setLoading] = useState(false);


   const getAllFeedbacks = async () => {
      setLoading(true)
      try {
         let res = await axios.get(`/api/feedback`)
         setAllFeedbacks(res.data.msg)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         let errors = error.response.data.msg
         if (errors) toast.error(errors)
      }
   }

   useEffect(() => {
      getAllFeedbacks()
   }, [])

   loading && <Loader1 />

   if (allFeedbacks.length === 0) return <h1 className="text-muted text-center text-capitalize my-5">No feedback yet</h1>


   return (
      <Container className="my-5">
         <h2 className="text-center text-capitalize title-color">user's feedback</h2>
         <Underline1 />
         <div className="product-name mt-4">
            {
               allFeedbacks.map(feedback => (
                  <Card key={feedback._id} className="shadow">
                     <CardHeader className="bg-primary text-white text-capitalize">
                        <h3>{feedback.name}</h3>
                     </CardHeader>
                     <CardBody className="feedback-body">
                        <p className="text-muted"><strong className="title-color mr-2 text-capitalize">Name:</strong>{feedback.name}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Email:</strong>{feedback.email}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Phone Number:</strong> {feedback.telephone === null ? 'Nil...' : feedback.telephone}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Feedback sent:</strong> {dateFormat(feedback.createdAt)}</p>
                        <div>
                           <h5 className="title-color">Message</h5>
                           <p className="text-muted">{feedback.message}</p>
                        </div>
                     </CardBody>
                     {
                        feedback.user_id && <CardFooter>
                           <h3>{feedback.user_name}</h3>
                        </CardFooter>
                     }
                  </Card>
               ))
            }
         </div>
      </Container>
   )
}

export default UsersFeedback
