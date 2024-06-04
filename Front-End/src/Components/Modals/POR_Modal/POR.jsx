import React, { useContext, useState } from 'react'
import './POR.css';
import { Context } from '../../../Context/StoreContext';
const POR = ({setShowPOR}) => {
    const [POR, setPOR] = useState({
        description:""
    });
    const {resume, updateResume, setResume} = useContext(Context);
    const handlePOR = e =>{
        const field = e.target.name;
        const value = e.target.value;
        setPOR(prev=>({...prev, [field]:value}));
        console.log(POR);
    }
    const handleSubmit = (e) =>{
         e.preventDefault();
            const updatedResume = {...resume, POR:[...resume.POR || [], POR]}
            console.log("updated resume from textarea",updateResume)
            setResume(updatedResume)
            updateResume(updatedResume);
            setShowPOR(false)
    }
  return (
    <div className='POR'>
        <div onClick={()=>setShowPOR(false)} className="modal-wrapper"></div>
        <div className="por-details">
            <h3>Description</h3>
            <p>If you have been/are an active part of societies, conducted any events or led a team, add details here</p>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handlePOR} rows={20} cols={100} value={POR.description} name="description" id="description"></textarea>
                <button type='submit'>save</button>
            </form>
        </div>
    </div>
  )
}

export default POR
