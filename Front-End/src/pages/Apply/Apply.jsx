import React, { useContext, useEffect, useState } from 'react';
import "./Apply.css";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Emodal from '../../Components/Modals/EducationModal/Emodal';
import axios from 'axios';
import { Context } from '../../Context/StoreContext';
import WorkModal from '../../Components/Modals/WorkModal/WorkModal';
import POR from '../../Components/Modals/POR_Modal/POR';
import Project from '../../Components/Modals/Project_Modal/Project';
import Skills from '../../Components/Modals/Skills_Modal/Skills';
import Accomplishments from '../../Components/Modals/Accomplishments/Accomplishments';

const Apply = () => {
    const { id } = useParams();
    const { url,updateResume, resume,setResume } = useContext(Context);
    const token = Cookies.get('token_');
    const [showEdu, setShowEdu] = useState(false);
    const [showJob, setShowJob] = useState(false);
    const [showIntern, setShowIntern] = useState(false);
    const [showPOR, setShowPOR] = useState(false);
    const [showProj, setShowProj] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showAccomplishments, setShowAccomplishments] = useState(false);

    const applyForJob = async(id) =>{
        try {
            const response = await axios.patch(url+"/job/apply", {id},{headers:{token}})
            console.log("response from apply",response.data);

        } catch (error) {
            console.log("error occured")
        }
    }



    const deleteEd = async (index) => {
        try {
            const updatedEducation = resume.education.filter((_, i) => i !== index);
            const updatedResume = { ...resume, education: updatedEducation };
            setResume(updatedResume);
            updateResume(updatedResume);
            console.log("From deleted:",updatedResume);
            console.log("Resume updated after deletion");
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };

    const deleteJob = async (index) => {
        try {
            const job = resume?.job?.filter((_, i) => i !== index);
            const updatedResume = { ...resume, job };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };
    const deleteIntern = async (index) => {
        try {
            const intern = resume.intern.filter((_, i) => i !== index);
            const updatedResume = { ...resume, intern };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };
    const deletePOR = async (index) => {
        try {
            const POR = resume.POR.filter((_, i) => i !== index);
            const updatedResume = { ...resume, POR };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };
    const deleteProj = async (index) => {
        try {
            const project = resume.project.filter((_, i) => i !== index);
            const updatedResume = { ...resume, project };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };
    const deleteSkill = async (index) => {
        try {
            const skills = resume.skills.filter((_, i) => i !== index);
            const updatedResume = { ...resume, skills };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };
    const deleteAcco = async (index) => {
        try {
            const accomplishments = resume.accomplishments.filter((_, i) => i !== index);
            const updatedResume = { ...resume, accomplishments };
            setResume(updatedResume);
            updateResume(updatedResume);
        } catch (error) {
            console.error("Error updating resume after deletion:", error);
        }
    };




    return (
        <div className='apply'>
            <h1>Your Resume</h1>
            <div>
                <div className="contact-details">
                    <div className="name"></div>
                    <div className="email"></div>
                    <div className="location"></div>
                </div>
                <hr />
                <div className="education flex">
                    <h3>Education</h3>
                    <div className="flex-col">
                    <div className='flex-c'>
                        <div className="education_content">
                            {resume?.education?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <h4>{item.graduation?.degree}</h4>
                                        <p>{item.graduation?.college_name}</p>
                                        <p>{item.graduation?.start_year ?  `${item.graduation?.start_year} - ${item.graduation?.end_year}` :null}</p>
                                    </div>
                                    {item.graduation?.college_name ? <p onClick={() => deleteEd(k)}>delete</p> : null}
                                </div>
                            ))}
                            {resume?.education?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <h3>{item.HSC?.school}</h3>
                                        <p>{item.HSC?.stream}</p>
                                        <p>{item.HSC?.performance_scale}{item.HSC?.performance_scale? " : ":null}{item.HSC?.performance}</p>
                                        <p>{item.HSC?.year_of_completion}</p>
                                    </div>
                                    {item.HSC?.school ? <p onClick={() => deleteEd(k)}>delete</p> : null}
                                </div>
                            ))}
                            {resume?.education?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <h3>{item.SSC?.school}</h3>
                                        <p>{item.SSC?.stream}</p>
                                        <p>{item.SSC?.performance_scale}{item.SSC?.performance_scale?" : ":null}{item.SSC?.performance}</p>
                                        <p>{item.SSC?.year_of_completion}</p>
                                    </div>
                                    {item.SSC?.school ? <p onClick={() => deleteEd(k)}>delete</p> : null}
                                </div>
                            ))}
                               {resume?.education?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <h3>{item.diploma?.college}</h3>
                                        <p>{item.diploma?.stream}</p>
                                        <p>{item.diploma?.performance}</p>
                                    </div>
                                    {item.diploma?.college ? <p onClick={() => deleteEd(k)}>delete</p> : null} 
                                    </div>
                              ))}

                               {resume?.education?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <h3>{item.PhD?.college}</h3>
                                        <p>{item.PhD?.stream}</p>
                                        <p>{item.PhD?.performance}</p>
                                    </div>
                                    {item.PhD?.college? <p onClick={() => deleteEd(k)}>delete</p> : null} 
                                    </div>
                              ))}
                        </div>
                        <div className="education_add">
                            {showEdu ? <Emodal resume={resume} setResume={setResume} setShowEdu={setShowEdu} /> : null}
                            <p onClick={() => setShowEdu(true)} className='blue'> + Add education</p>
                        </div>
                    </div>
                    </div>
                </div>
                <hr />

                <div className="work_experience flex ">
                    <h3>Work experience</h3>
                            <div className="flex-col">
                            <div className="experience_content flex-col">
                    {resume?.job?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        {item?.organization ? <p>*job </p>:null}
                                        <h4>{item?.organization}</h4>
                                        <p>{item?.profile}</p>
                                        <p>{item?.location}</p>
                                        <p>{new Date(item?.start_date).getFullYear()} to {new Date(item?.end_date).getFullYear()}</p>
                                    </div>
                                    {item?.profile ? <p onClick={() => deleteJob(k)}>delete</p> : null} 
                                    </div>
                              ))}

                    {resume?.intern?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        {item?.organization ? <p> *Intern</p>:null}
                                        <h4>{item?.organization}</h4>
                                        <p>{item?.profile}</p>
                                        <p>{item?.location}</p>
                                        <p>{new Date(item?.start_date).getFullYear()} to {new Date(item?.end_date).getFullYear()}</p>
                                    </div>
                                    {item?.profile ? <p onClick={() => deleteIntern(k)}>delete</p> : null} 
                                    </div>
                              ))}
                         </div>
                    <div className="experience_add flex">
                       <div className='job flex'>{showJob ? <WorkModal setShowJob={setShowJob} title={"Job details"}/>:null}
                       <p onClick={() => setShowJob(true)} className='blue'> + Add job</p>
                       <p onClick={() => setShowIntern(true)} className='blue'> + Add Intern</p>
                       </div>
                        </div>

                       <div className="internship">
                       {showIntern ? <WorkModal setShowIntern={setShowIntern} setShowJob={setShowJob}  title={"Internship details"}/>:null}
                       </div>
                    </div>
                </div>
                <hr />

                <div className="por flex">
                    <h3>POR</h3>
                    <div className="flex-col">
                    <div className="por_content">
                    {resume?.POR?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <p>{item?.description}</p>
                                    </div>
                                    {item?.description ? <p onClick={() => deletePOR(k)}>delete</p> : null} 
                                    </div>
                              ))}
                    </div>
                    <div className="por_add">
                             { showPOR? <POR setShowPOR={setShowPOR}/>:null}
                    <p onClick={() => setShowPOR(true)} className='blue'> + Add POR</p>
                    </div>
                    </div>
                </div>
                <hr />
                
                <div className="projects flex">
                    <h3>Projects</h3>
                    <div className="flex-col">
                    <div className="projects_content">
                    {resume?.project?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <p>{item?.title}</p>
                                        <p>{item?.start_date} to {item.end_date}</p>
                                        <p>{item.description}</p>
                                    </div>
                                    {item?.description ? <p onClick={() => deleteProj(k)}>delete</p> : null} 
                                    </div>
                              ))}
                    </div>
                    <div className="projects_add">
                    {showProj ? <Project setShowProj={setShowProj}/> : null}
                        <p onClick={() => setShowProj(true)} className='blue'> + Add Project</p>
                    </div>
                    </div>
                </div>
                <hr />

                <div className="skills flex">
                <h3>skills</h3>
                    <div className="flex-col">
                    <div className="skills_content">
                        {resume?.skills?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <p>{item}</p>
                                       
                                    </div>
                                    {item ? <p onClick={() => deleteSkill(k)}>delete</p> : null} 
                                    </div>
                              ))}
                    </div>
                    <div className="skills_add">
                    {showSkills ? <Skills setShowSkills={setShowSkills}/>:null}
                    <p onClick={() => setShowSkills(true)} className='blue'> + Add skills</p>
                    </div>

                </div>
                    </div>
                <hr />

                <div className="accomplishment flex">
                    <h3>Accomplishments</h3>
                   <div className="flex-col">
                   <div className="accomplishment_content">
                        {resume?.accomplishments?.map((item, k) => (
                                <div className='flex' key={k}>
                                    <div className="flex-c">
                                        <p>{item}</p>
                                    </div>
                                    {item ? <p onClick={() => deleteAcco(k)}>delete</p> : null} 
                                    </div>
                              ))}
                    </div>
                    <div className="accomplishment_add">
                        {showAccomplishments ? <Accomplishments setShowAccomplishments={setShowAccomplishments}/>:null}
                        <p onClick={() => setShowAccomplishments(true)} className='blue'> + Add Accomplishments</p>
                    </div>
                   </div>
                </div>

            </div>
            <button onClick={()=>applyForJob(id)} className='apply-button'>Apply</button>
        </div>
    );
};

export default Apply;