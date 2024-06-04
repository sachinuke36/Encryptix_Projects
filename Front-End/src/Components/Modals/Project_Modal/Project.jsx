import React, { useContext, useState } from 'react'
import './Project.css'
import { Context } from '../../../Context/StoreContext'
const Project = ({setShowProj}) => {
    const [project,setProject]= useState({
        title:'',
        start_date:'',
        end_date:'',
        description:'',
    })
    const {resume, setResume, updateResume} = useContext(Context);

    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        setProject(prev=>({...prev, [field]:value}));
        console.log(project)
    }

    const handleSubmit = e =>{
        e.preventDefault();
        const updatedResume = {...resume, project:[...resume?.project || [], project] };
        setResume(updatedResume);
        updateResume(updatedResume);
        setShowProj(false);
    }

  return (
    <div className='project'>
      <div onClick={()=>setShowProj(false)} className="modal-wrapper"></div>
      <div className="project-content flex-col">
        <h3>Project details</h3>
        <form className='flex-col' onSubmit={handleSubmit}>
            <div className="title flex-col">
                <label htmlFor="title">Title</label>
                <input value={project.title} onChange={handleChange} type="text" name="title" id="title" />
            </div>
            <div className="duration flex">
                <div className="start_date_box flex-col">
                    <label htmlFor="start_date">Start Date</label>
                    <input type="date" value={project.start_date} onChange={handleChange} name="start_date" id="start_date" />
                </div>
                <div className="end_date_box flex-col">
                    <label htmlFor="end_date">End date</label>
                    <input type="date" value={project.end_date} onChange={handleChange} name="end_date" id="end_date" />
                </div>
            </div>
            <div className="description flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={project.description} onChange={handleChange} rows={20} cols={50}  id="description"></textarea>
                </div>
                <button type='submit'>save</button>
        </form>
      </div>
    </div>
  )
}

export default Project
