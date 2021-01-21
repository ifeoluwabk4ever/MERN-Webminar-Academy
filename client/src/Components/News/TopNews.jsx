import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'

import Loading from '../../Utils/Misc/Loading'

const TopNews = ({ topNews, isLoading }) => {

   isLoading && <Loading />

   return (
      <Container className="my-5">
         <div>
            <div className="my-2">
               <h5>News 1</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, pariatur accusantium, reprehenderit ut facilis alias autem amet asperiores magni officiis atque voluptatibus eum perferendis voluptate distinctio hic commodi odit similique molestias earum mollitia quaerat sunt cum? Saepe, odit natus! A quia animi est excepturi doloremque culpa aut neque reprehenderit pariatur incidunt impedit placeat repudiandae rerum nemo aspernatur delectus perferendis similique et blanditiis voluptatem, dolor omnis. Id quis sit perspiciatis.</p>
            </div>
            <div className="my-2">
               <h5>News 2</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, pariatur accusantium, reprehenderit ut facilis alias autem amet asperiores magni officiis atque voluptatibus eum perferendis voluptate distinctio hic commodi odit similique molestias earum mollitia quaerat sunt cum? Saepe, odit natus! A quia animi est excepturi doloremque culpa aut neque reprehenderit pariatur incidunt impedit placeat repudiandae rerum nemo aspernatur delectus perferendis similique et blanditiis voluptatem, dolor omnis. Id quis sit perspiciatis.</p>
            </div>
            <div className="my-2">
               <h5>News 3</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, pariatur accusantium, reprehenderit ut facilis alias autem amet asperiores magni officiis atque voluptatibus eum perferendis voluptate distinctio hic commodi odit similique molestias earum mollitia quaerat sunt cum? Saepe, odit natus! A quia animi est excepturi doloremque culpa aut neque reprehenderit pariatur incidunt impedit placeat repudiandae rerum nemo aspernatur delectus perferendis similique et blanditiis voluptatem, dolor omnis. Id quis sit perspiciatis.</p>
            </div>
            {
               topNews.length > 0 && topNews.map(item => (
                  <div className="my-2" key={item._id}>
                     <img src={`/Uploads/${item.mainImage}`} alt={item.headline} className="img-container" />
                     <h5>{item.headline}</h5>
                     <p>{item.storyline.substring(0, 200)}...</p>
                  </div>
               ))
            }
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   topNews: state.mainNews.news,
   isLoading: state.mainNews.isLoading
})

export default connect(mapStateToProps, null)(TopNews)
