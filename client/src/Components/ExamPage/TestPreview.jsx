import React from 'react'
import { Card, CardBody, CardHeader, Container, NavLink } from 'reactstrap'
import { timeFrame } from '../../Utils/QuestionData'

const TestPreview = () => {
   return (
      <Container className="py-5 d-flex justify-content-center align-content-center">
         <div className="m-auto preview-page">
            <Card>
               <CardHeader className="text-uppercase text-center"><h3>post UTME Preview page</h3>
               </CardHeader>
               <CardBody className="p-3">
                  <p className="text-uppercase">please read the following instructions</p>
                  <div>
                     <ol className="text-muted">
                        <li>Attempt all questions.</li>
                        <li>Do think well before answering each question.</li>
                        <li>You have <strong>{timeFrame} {`${timeFrame > 1 ? 'minutes' : 'minute'}`}</strong> to attempt all questions.</li>
                        <li>Click on start now to begin your test.</li>
                        <li>Goodluck.</li>
                     </ol>
                  </div>
                  <div className="d-flex">
                     <NavLink href="/new-student-test" className="btn btn-outline-success my-3 mx-auto text-capitalize navList">Start now</NavLink>
                  </div>
               </CardBody>
            </Card>
         </div>

      </Container >
   )
}

export default TestPreview
