import React, { useRef } from 'react'
import './Recommended.css'
import { Jobs } from '../../assets/db.js'
import JobCard from '../JobCard/JobCard.jsx'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import {motion} from 'framer-motion'

const Recommended = () => {
    const ref = useRef(null);
    const scroll = (scrollOffset)=>{
        ref.current.scrollLeft += scrollOffset;
    }

    
    return (
        <div className='recommended'>
            <h2>Recommended Jobs/Internships</h2>
            <div className="recommended-scroller" ref={ref}>
                {
                    Jobs.map((item, i) => (
                        <JobCard key={i} title={item.title} logo={item.logo} company={item.company} location={item.location} stipend={item.stipend} duration={item.duration} type={item.type} />
                    ))
                }
            </div>
            <div className="scroll-buttons">
             <motion.button 
             whileTap={{
                scale:0.95,
                rotate:'2.5deg'
             }}
             onClick={()=>scroll(-200)}><FaAngleDoubleLeft /></motion.button>
             <motion.button
             whileTap={{
                scale:0.95,
                rotate:'2.5deg'
             }}
              onClick={()=>scroll(200)}><FaAngleDoubleRight /></motion.button>
            </div>
           

        </div>
    )
}

export default Recommended
