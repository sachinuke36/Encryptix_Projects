import React from 'react'
import './Home.css'
import Header from '../../Components/header/Header'
import Recommended from '../../Components/Recommended/Recommended'
import Footer from '../../Components/footer/Footer'
const Home = () => {
  return (
   <div className='home'>
        <Header/>
        <Recommended/>
    </div>


   
  )
}

export default Home
