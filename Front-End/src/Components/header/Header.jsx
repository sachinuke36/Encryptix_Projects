import React, { useRef }  from 'react'
import './Header.css'
import HomeSlider from '../Home_slider/HomeSlider';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useContext } from 'react';
import { Context } from '../../Context/StoreContext';

const Header = () => {
    const ref = useRef(null);
    const {jobseeker} = useContext(Context);

    const posts =[
        {
            image:'src/assets/home_1.webp'
        },
        {
            image:'src/assets/home_2.webp'
        },
        {
            image:'src/assets/home_3.webp'
        },
        {
            image:'src/assets/home_4.webp'
        },
       
    ]
    const scroll=(scrollOffset)=>{
        ref.current.scrollLeft += scrollOffset;
    }
  return (
    <div className="header">
        <h1>Hi, {jobseeker?.name}</h1>
        <p className='title'>Let's help you land your dream career</p>
        <div className="trending">
            <p>Trending on JobDekho</p>
            <div className="posts" ref={ref}>
                {
                    posts.map((item,i)=>( <HomeSlider key={i} image={item.image} />))
                }
               
            </div>
            <div className="scroll-buttons">
             <button onClick={()=>scroll(-200)}><FaAngleDoubleLeft /></button>
             <button onClick={()=>scroll(200)}><FaAngleDoubleRight /></button>
            </div>
        </div>
    </div>
  )
}

export default Header
