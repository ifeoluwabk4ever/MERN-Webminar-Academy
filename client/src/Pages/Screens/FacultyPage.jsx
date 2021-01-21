import React from 'react'
import { Container, Card, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { BiEditAlt, BiTrashAlt } from 'react-icons/all'

import Loading from '../../Utils/Misc/Loading'
import { deleteFaculty } from '../../Data/Actions/FacultyAction'


const FacultyPage = ({ faculties, isLoading, deleteFaculty }) => {

   let deleteFacultyClick = (faculty_slug, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         deleteFaculty(faculty_slug)
      }
   }

   isLoading && <Loading />


   return (
      <Container className="py-3">
         <h2 className="text-center text-title text-uppercase text-decoration-underline">faculties</h2>
         {faculties.length > 0 ?
            <div className="faculty-list">
               {
                  faculties.map(item => (
                     <Card key={item._id} className="shadow">
                        <CardHeader className="d-flex justify-content-between align-items-center list-group-item-success">
                           <h6>{item.faculty_name}</h6>
                           <div className="d-flex justify-content-between align-items-center">
                              <BiEditAlt
                                 color="#0dcaf0"
                                 className="faculty-list-i"
                              />
                              <BiTrashAlt
                                 color="#dc3545"
                                 className="faculty-list-i"
                                 onClick={() => deleteFacultyClick(item.faculty_slug, item.faculty_name)}
                              />
                           </div>
                        </CardHeader>
                        <CardBody className="overflow-auto">
                           <p className="text-capitalize">{item.faculty_code}</p>
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
   faculties: state.mainFaculty.faculty,
   isLoading: state.mainFaculty.isLoading

})

export default connect(mapStateToProps, { deleteFaculty })(FacultyPage)
