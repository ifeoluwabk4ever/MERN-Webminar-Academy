import React from 'react'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'

import Loading from '../../Utils/Misc/Loading'

const TopNews = ({ topNews, isLoading }) => {

   isLoading && <Loading />

   const deleteNewsClick = (headies, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         // deleteCourses(headies)
      }
   }

   return (
      <Container className="my-5">
         <h2 className="text-center text-title text-uppercase text-decoration-underline">top news</h2>
         {topNews.length > 0 ?
            <div className="faculty-list">
               {
                  topNews.length > 0 ? topNews.map(item => (
                     <Card className="my-2 shadow" key={item._id}>
                        <CardHeader className="d-flex justify-content-between align-items-center list-group-item-success">
                           <h6>{item.headline}</h6>
                           <div className="d-flex justify-content-between align-items-center">
                              <BiEditAlt
                                 color="#0dcaf0"
                                 className="faculty-list-i"
                              />
                              <BiTrashAlt
                                 color="#dc3545"
                                 className="faculty-list-i"
                                 onClick={() => deleteNewsClick(item.news_slug, item.headline)}
                              />
                           </div>
                        </CardHeader>
                        <CardBody className="overflow-auto">
                           <img src={`/Uploads/${item.mainImage}`} alt={item.headline} className="img-fluid" />
                           <p className="my-3">{item.storyline.substring(0, 200)}...</p>
                        </CardBody>
                     </Card>
                  )) :
                     <h1 className="text-center text-muted text-uppercase">No item presently</h1>
               }
            </div> :
            <h1 className="text-center text-muted text-uppercase">No item presently</h1>
         }
      </Container>
   )
}

const mapStateToProps = state => ({
   topNews: state.mainNews.news,
   isLoading: state.mainNews.isLoading
})

export default connect(mapStateToProps, null)(TopNews)
