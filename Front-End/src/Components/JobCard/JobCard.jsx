import React from 'react'
import './JobCard.css'
import { CiLocationOn } from "react-icons/ci";
import { PiMoneyWavy } from "react-icons/pi";
import { GiDuration } from "react-icons/gi";



const JobCard = ({ title, logo, company, location, stipend, duration, type }) => {
    return (
        <div className='jobcard'>
            <div className="card-upper">
                <div className="card-upper-left">
                    <p className="title">{title}</p>
                    <p className="company">{company}</p>
                </div>
                <div className="card-upper-right">
                    <img src={logo} alt="" />
                </div>
            </div>
            <hr />
            <div className="card-lower">
                <div className='location flex-s'>
                    <CiLocationOn />
                    <p>{location}</p>
                </div>
                <div className="stipend flex-s">
                    <PiMoneyWavy />
                    <p>Rs. {stipend.from}-{stipend.to}/month</p>
                </div>
                <div className="duration flex-s">
                    <GiDuration />
                    <p>{duration}</p>
                </div>
                <div className="card-bottom">
                <div className="type">{type}</div>
                <a href="">View Details</a>
                </div>
            </div>
        </div>

    )
}

export default JobCard
