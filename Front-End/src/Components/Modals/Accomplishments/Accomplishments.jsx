import React,{useState, useContext} from 'react'
import './Accomplishments.css'
import { Context } from '../../../Context/StoreContext';
const Accomplishments = ({setShowAccomplishments}) => {
    const {resume, setResume, updateResume} = useContext(Context);
    const [accom, setAccom]= useState("")
    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        setAccom(value);
    }
    const handleSubmit = e =>{
        e.preventDefault();
        const acc = [...resume?.accomplishments || "", accom]
        const updatedResume = {...resume, accomplishments:acc}
        setResume(updatedResume);
        updateResume(updatedResume)
        setShowAccomplishments(false);
    }

  return (
    <div className='accomplishments'>
        <div onClick={()=>setShowAccomplishments(false)} className="modal-wrapper"></div>
        <div className="accomplishments-content flex-col">
            <form onSubmit={handleSubmit}>
                <div className="accomplishments_box flex-col">
                    <label htmlFor="accomplishments">Accomplishments</label>
                    <textarea value={resume.accom} onChange={handleChange} cols={50} rows={20} name="accomplishments" id="accomplishments"></textarea>
                    <button type='submit'>save</button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default Accomplishments
