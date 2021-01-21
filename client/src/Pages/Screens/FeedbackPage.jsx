import React from 'react'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'

import Loading from '../../Utils/Misc/Loading'

const FeebackPage = ({ feedbacks, isLoading }) => {

   isLoading && <Loading />

   const deleteNewsClick = (headies, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         // deleteCourses(headies)
      }
   }

   return (
      <Container className="my-5">
         {feedbacks.length > 0 ?
            <div className="faculty-list">
               {
                  feedbacks.map(item => (
                     <Card className="my-2 shadow" key={item._id}>
                        <CardHeader className="d-flex justify-content-between align-items-center list-group-item-success">
                           <h6>{item.name}</h6>
                           <div className="d-flex justify-content-between align-items-center">
                              <BiEditAlt
                                 color="#0dcaf0"
                                 className="faculty-list-i"
                              />
                              <BiTrashAlt
                                 color="#dc3545"
                                 className="faculty-list-i"
                                 onClick={() => deleteNewsClick(item.name_slug, item.name)}
                              />
                           </div>
                        </CardHeader>
                        <CardBody className="overflow-auto">
                           <img src={`/Uploads/${item.mainImage}`} alt={item.name} className="img-fluid" />
                           <p className="my-3">{item.email}</p>
                           <p className="my-3">{item.telephone}</p>
                           <p className="my-3">{item.message}</p>
                        </CardBody>
                     </Card>
                  ))
               }
            </div> :
            <h1 className="text-center text-muted text-uppercase">No item presently</h1>
         }
      </Container>
   )
}

const mapStateToProps = state => ({
   feedbacks: state.mainFeedback.feedback,
   isLoading: state.mainFeedback.isLoading
})

export default connect(mapStateToProps, null)(FeebackPage)
