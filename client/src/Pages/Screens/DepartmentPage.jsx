import React from 'react'
import { Container, Card, CardHeader, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { BiEditAlt, BiTrashAlt } from 'react-icons/all'

import Loading from '../../Utils/Loading'
import { deleteDepartment } from '../../Data/Actions/DepartmentAction'



const DepartmentPage = ({ departments, isLoading, deleteDepartment }) => {

   let deleteDeptClick = (course_slug, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         deleteDepartment(course_slug)
      }
   }

   isLoading && <Loading />

   return (
      <Container className="py-3">
         <div className="faculty-list">
            {
               departments.map(item => (
                  <Card key={item._id} className="shadow">
                     <CardHeader className="d-flex justify-content-between align-items-center list-group-item-success">
                        <h6>{item.department}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                           <BiEditAlt
                              color="#0dcaf0"
                              className="faculty-list-i"
                           />
                           <BiTrashAlt
                              color="#dc3545"
                              className="faculty-list-i"
                              onClick={() => deleteDeptClick(item.course_slug, item.department)}
                           />
                        </div>
                     </CardHeader>
                     <CardBody className="overflow-auto">
                        <p className="text-capitalize">course: {item.course}</p>
                        <p className="text-capitalize">course code: {item.course_code}</p>
                        <p className="text-capitalize">faculty: {item.faculty_name}</p>
                     </CardBody>
                  </Card>
               ))
            }
         </div>
      </Container>
   )
}


const mapStateToProps = state => ({
   departments: state.mainDepartment.department,
   isLoading: state.mainDepartment.isLoading
})

export default connect(mapStateToProps, { deleteDepartment })(DepartmentPage)
