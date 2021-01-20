import React from 'react'
import { connect } from 'react-redux'


import HomeBanner from '../Components/Home/HomeBanner'
import HomeSidebar from '../Components/Home/HomeSidebar'
import HomeTopNews from '../Components/Home/HomeTopNews'

const Home = ({ isAdmin }) => {
   return (
      <div>
         <div className={`${!isAdmin ? 'home-panel' : 'home-panel-sub'}`}>
            <HomeBanner />
            {!isAdmin && <HomeTopNews />}
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   isAdmin: state.mainAdmin.isAdmin
})

export default connect(mapStateToProps, null)(Home)
