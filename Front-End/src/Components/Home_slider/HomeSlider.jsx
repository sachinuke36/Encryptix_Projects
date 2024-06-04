import React from 'react'
import './HomeSlider.css'
import { FaImage } from 'react-icons/fa'
const HomeSlider = ({image}) => {
   
  return (
    <div className='home-slider'>
      <img src={image} alt="" />
    </div>
  )
}

export default HomeSlider
