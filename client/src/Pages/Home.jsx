import React from 'react'
import { connect } from 'react-redux'


import HomeBanner from '../Components/Home/HomeBanner'

const Home = ({ isAdmin }) => {
   return (
      <div>
         <div className="home-panel">
            <HomeBanner />
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   isAdmin: state.mainAdmin.isAdmin
})

export default connect(mapStateToProps, null)(Home)
