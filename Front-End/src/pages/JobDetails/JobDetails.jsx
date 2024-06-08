import React, { useContext, useEffect, useState } from 'react'
import './JobDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/StoreContext';
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { SiKnowledgebase } from "react-icons/si";
import { CgSandClock } from "react-icons/cg";
import { GiDuration } from "react-icons/gi";
import ReactMarkdown from 'react-markdown';
import Cookies from 'js-cookie'

const JobDetails = () => {
    const [jobInfo, setJobInfo] = useState();
    const { url } = useContext(Context);
    const { id } = useParams(); //
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getInfo = async () => {
            try {
                const token = Cookies.get("token_");
                const response = await axios.get(`${url}/job/info/${id}`, { headers: { token } });
                setJobInfo(response.data.job);
            } catch (error) {
                console.log(error);
                return (<h1>Coudn't Connect with the server..............</h1>)
            } finally {
                setIsLoading(false);
            }
        }
        getInfo();
    }, [])

    if (isLoading) {
        return (<div className='loading-box'> <div className="loading">
          
        </div>
        <h2 style={{textAlign:'center', margin:'2px'}} > Loading</h2>
          </div>)
    }

    return (
        <div className='job_details'>
            {
                jobInfo ?
                    <div className='job_info'>
                        <h1>{jobInfo.title}</h1>
                        <div className="job_details_content">
                            <h2 className="title">{jobInfo.title}</h2>
                            <p className="company">{jobInfo.company}</p>
                            <div className="location">
                               <div className="head"><p> <IoLocationSharp /></p> 
                                <span>{jobInfo.location}</span></div>
                            </div>
                            <div className="info_row">
                                <div className="start_date f">
                                    <div className="head"> <p><MdOutlineNotStarted /></p> <span>START DATE</span></div>
                                    <p>{jobInfo.start_date}</p>
                                </div>
                                <div className="salary f">
                                    <div className="head"><p><FaMoneyBillWave /></p><span>{jobInfo.type === 'internship' ? "STIPEND" : "SALARY"}</span></div>
                                    <p>{jobInfo.min_salary === jobInfo.max_salary ? `${jobInfo.min_salary}` : `${jobInfo.min_salary}-${jobInfo.max_salary}`}</p>
                                </div>
                                <div className="experience f">
                                    <div className="head"> <p><SiKnowledgebase /></p><span>EXPERIENCE</span></div>
                                    <p>{jobInfo.experience}</p>
                                </div>
                                <div className="last_date f">
                                    <div className="head"><p><CgSandClock /></p><span>APPLY BY</span></div>
                                    <p>{jobInfo.last_date}</p>
                                </div>
                                {jobInfo.type === 'internship' ?
                                    <div className="duration f">
                                       <div className="head"> <p><GiDuration /> </p> <span> DURATION</span></div>
                                        <p>{jobInfo.duration}</p>
                                    </div> : null
                                }
                            </div>
                            <div className="type"><p>{jobInfo.type}</p></div>
                            <hr />
                            <div className="about_job">
                                <h2>About the {jobInfo.type}</h2>
                                <ReactMarkdown className="markdown-content">{jobInfo.description}</ReactMarkdown>
                            </div>
                            <div className="skills_container" style={{ color: 'white' }}>
                                <h2>Skills</h2>
                               <div className="skills">
                               {jobInfo.skills && jobInfo.skills.map((skill, index) => (
                                    <div className='skill' key={index}>{skill}</div>
                                ))}
                               </div>
                            </div>
                            <div className="openings">
                                <h2>No. of Openings</h2>
                                <p>{jobInfo.openings}</p>
                            </div>
                            <div className="about_company">
                                <h2>About {jobInfo.company}</h2>
                            <ReactMarkdown className="markdown-content">{jobInfo.company_description}</ReactMarkdown>
                            </div>
                            <div className="apply_button">
                              <button onClick={()=>navigate(`/jobs/apply/${id}`)} >Apply</button>
                            </div>
                            
                        </div>

                    </div> : null



            }
            <h1></h1>

        </div>
    )
}

export default JobDetails
