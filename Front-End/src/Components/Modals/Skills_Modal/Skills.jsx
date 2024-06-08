import React, { useContext, useState } from 'react'
import './Skills.css'
import { Context } from '../../../Context/StoreContext'

const Skills = ({setShowSkills}) => {
    const {resume, setResume, updateResume} = useContext(Context);
    const [skill2,setSkill]=useState("");
    const [skills, setSkills] = useState(resume.skills || [])
    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        setSkill(value);
    }
    const handleSubmit = e =>{
        e.preventDefault();
        const skill = [...resume?.skills || "", skill2]
        const updatedResume = {...resume, skills:skill}
        setResume(updatedResume);
        updateResume(updatedResume)
        setShowSkills(false);
    }
  return (
    <div className='skills'>
        <div onClick={()=>setShowSkills(false)} className="modal-wrapper"></div>
        <div  className="skills-content flex-col">
            <form className='flex-col' onSubmit={handleSubmit}>
                <label htmlFor="skills">Skills</label>
                <input value={skills.value} required onChange={handleChange} type="text" name="skills" id="skills" />
                <button type='submit'>save</button>
            </form>
        </div>
      
    </div>
  )
}

export default Skills
