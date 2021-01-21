import React from 'react'
import { Container, Card, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { BiEditAlt, BiTrashAlt } from 'react-icons/all'

import Loading from '../../Utils/Misc/Loading'
import { deleteCourses } from '../../Data/Actions/CoursesAction'



const CoursesPage = ({ courses, isLoading, deleteCourses }) => {

   let deleteCoursesClick = (course_slug, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         deleteCourses(course_slug)
      }
   }

   isLoading && <Loading />

   return (
      <Container className="py-3">
         {courses.length > 0 ?
            <div className="faculty-list">
               {
                  courses.map(item => (
                     <Card key={item._id} className="shadow">
                        <CardHeader className="d-flex justify-content-between align-items-center list-group-item-success">
                           <h6>{item.course_title}</h6>
                           <div className="d-flex justify-content-between align-items-center">
                              <BiEditAlt
                                 color="#0dcaf0"
                                 className="faculty-list-i"
                              />
                              <BiTrashAlt
                                 color="#dc3545"
                                 className="faculty-list-i"
                                 onClick={() => deleteCoursesClick(item.course_slug, item.course_title)}
                              />
                           </div>
                        </CardHeader>
                        <CardBody className="overflow-auto">
                           <p className="text-capitalize">Course code: {item.course_code}</p>
                           <p className="text-capitalize">course unit: {item.course_unit}</p>
                           <p className="text-capitalize">course level: {item.level}</p>
                           <p className="text-capitalize">course semester: {item.semester}</p>
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
   courses: state.mainCourses.courses,
   isLoading: state.mainCourses.isLoading
})

export default connect(mapStateToProps, { deleteCourses })(CoursesPage)
