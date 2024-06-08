import React, { useContext, useState } from 'react'
import './WorkModal.css'
import { Context } from '../../../Context/StoreContext';
const WorkModal = ({setShowJob, setShowIntern, title}) => {
    const [job, setJob]= useState({
        designation:'',
        location:'',
        start_date:'',
        end_date:'',
        description:'',
        organization:'',
        profile:''
    });
    const [intern, setIntern]= useState({
        designation:'',
        location:'',
        start_date:'',
        end_date:'',
        description:'',
        organization:'',
        profile:''
    });

    const {resume,setResume, updateResume} = useContext(Context);

    const handleCloseModal = ()=>{
        if(title==="Job details"){
            setShowJob(false);
        }else if(title==="Internship details"){
            setShowIntern(false);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(title==="Job details"){
            const updatedResume = {...resume, job:[...resume?.job || [], job]};
            setResume(updatedResume);
            updateResume(updatedResume);
            setShowJob(false);
        }else if(title==="Internship details"){
            const updatedResume = {...resume, intern:[...resume?.intern || [] , intern]};
            setResume(updatedResume);
            updateResume(updatedResume);
            setIntern(false)
        }
       

    }

    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        setJob(prev=>({...prev, [field]:value}));
        setIntern(prev=>({...prev, [field]:value}));
        console.log(job)
    }
  return (
    <div className='workmodal'>
        <div  onClick={handleCloseModal} className="modal-wrapper"></div>
        <div className="workmodal-content">
            <div className="heading"></div>
            <form onSubmit={handleSubmit}>
                <div className="designation-box flex-col">
                    <label htmlFor="designation">Designation</label>
                    <input type="text" required value={job.designation} onChange={handleChange} name="designation" placeholder='e.g. software engineer' id="designation" />
                </div>
                <div className="profile-box flex-col">
                    <label htmlFor="profile">Profile</label>
                    <input type="text" required value={job.profile} onChange={handleChange} name="profile" placeholder='e.g. operations' id="profile" />
                </div>
                <div className="organization-box flex-col">
                    <label htmlFor="organization">Organization</label>
                    <input type="text" required name="organization" value={job.organization} onChange={handleChange} placeholder='e.g. dell' id="organization" />
                </div>
                <div className="location-box flex-col">
                    <label htmlFor="location">Location</label>
                    <input type="text" required name="location" value={job.location} onChange={handleChange} placeholder='e.g. mumbai' id="location" />
                </div>
                <div className="duration-box flex">
                    <div className="start_date_box flex-col">
                        <label htmlFor="start_date">Start Date</label>
                        <input type="date" required value={job.start_date} onChange={handleChange} name="start_date" id="start_date" />
                    </div>
                    <div className="end_date_box flex-col">
                        <label htmlFor="end_date">End date</label>
                        <input type="date" required value={job.end_date} onChange={handleChange} name="end_date" id="end_date" />
                    </div>
                </div>
                <div className="description-box flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea name="description"  value={job.description} onChange={handleChange} rows={10} id="description"></textarea>
                </div>
                <button type='submit'>save</button>
            </form>
        </div>
    </div>
  )
}

export default WorkModal
