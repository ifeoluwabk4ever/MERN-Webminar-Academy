import React from 'react'
import HomeBanner from '../Components/Home/HomeBanner'
import HomeSidebar from '../Components/Home/HomeSidebar'
import HomeTopNews from '../Components/Home/HomeTopNews'

const Home = () => {
   return (
      <div>
         <div className="home-panel">
            <HomeSidebar />
            <HomeBanner />
            <HomeTopNews />
         </div>
      </div>
   )
}

export default Home
