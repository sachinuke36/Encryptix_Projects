import React, { useEffect } from 'react'
import './JobCard_Job.css'
import { CiLocationOn } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'

const JobCard_Jobs = ({ title,
    company,
    location,
    min_salary,
    max_salary,
    experience,
    type,
    start_date,
    id,
    skills
 }) => {
        

        const navigate = useNavigate();

    return (
        <div className='jobcard-jobs'>
            <div className='jobs-head'>
                <h2>{title}</h2>
                <p className='jobs-company'>{company}</p>
            </div>

            <div className="jobs-location">
                <p><CiLocationOn /></p>
                <p>{location}</p>
            </div>

                <div className='job-middle' >
                        <div className="start-date border flex-col">
                            <p>START DATE</p>
                            <p> {start_date}</p>
                        </div>

                        <div className="salary flex-col">
                            <p>{type === 'internship' ? "STIPEND" : "SALARY"}</p>
                            <p>{min_salary === max_salary ? `${min_salary}` : `${min_salary} - ${max_salary}`}</p> 
                        </div>

                        <div className="experience border flex-col">
                            <p>EXPERIENCE</p>
                            <p>{experience}</p>
                        </div>

                        <div className="type">
                        <p>{type}</p> 
                        </div>
                    </div>
                <hr />
            <div className="jobs-bottom">
                <button onClick={()=>navigate(`/jobs/details/${id}`)}>View details</button>
            </div>
        </div>
    )
}

export default JobCard_Jobs
