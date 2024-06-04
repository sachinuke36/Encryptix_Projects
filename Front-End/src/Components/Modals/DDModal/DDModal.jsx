import React,{ useContext, useEffect, useState} from 'react'
import './DDModal.css'
import { Context } from '../../../Context/StoreContext';

const DDModal = ({title,diploma,PhD, setDiploma, setPhD}) => {
   const {resume, updateResume, setResume}= useContext(Context)
    const [data, setData]= useState({
        college:'',
        start_year:'',
        stream:'',
        end_year:'',
        performance_scale:'percentage',
        performance:''
    });

    const handleChange = e =>{
        const field = e.target.name;
        let value = e.target.value;
        if(e.target.type==='number'){
            value=Number(value)
        }
        setDiploma(prev=>({...prev, [field]:value}));
        setPhD(prev=>({...prev, [field]:value}));

    }

    const handleSubmit = e =>{
        e.preventDefault();
        if(title==='Diploma details'){
            const updatedResume = {...resume, education:[...resume.education, {diploma}]}
            setResume(updatedResume);
            console.log("updatedResume-Diploma",updatedResume);
            updateResume(updatedResume);

        }else if(title ==='PhD details'){
            const updatedResume = {...resume, education:[...resume.education, {PhD}]}
            setResume(updatedResume);
            console.log("updatedResume-PhD",updatedResume);
            updateResume(updatedResume);
        }
    }


  return (
    <div className='Degee_Diploma_details'>
        <div className="modal-wrapper"></div>
        <div className="degree-deploma-content">
          <h2>{title}</h2>
          <form onSubmit={handleSubmit}>
                <div className="college flex-col">
                    <label htmlFor="college">College</label>
                    <input type="text" value={diploma.college} onChange={handleChange}  name="college" id="college" />
                </div>

                <div className="duration flex">
                    <div className="start_year flex-col">
                        <label htmlFor="start_year">Start Year</label>
                        <input type="number" value={diploma.start_year} onChange={handleChange} name="start_year" id="start_year" />
                    </div>
                    <div className="end_year flex-col">
                        <label htmlFor="end_year">End year</label>
                        <input type="number" value={diploma.end_year} onChange={handleChange} name="end_year" id="end_year" />
                    </div>
                </div>

             <div className="stream flex-col">
                <label htmlFor="stream">Stream</label>
                <input type="text" value={diploma.stream} onChange={handleChange} name="stream" id="stream" />
             </div>

            <div className="performance_scale_box flex">
                <div className="performance_scale flex-col">
                    <label htmlFor="performance_scale">Performance Scale</label>
                    <select name="performance_scale" value={diploma.performance_scale} onChange={handleChange} id="performance_scale">
                        <option value="percentage">Percentage</option>
                        <option value="CGPA">CGPA(scale of 10)</option>
                    </select>
                </div>
                <div className="performance flex-col">
                    <label htmlFor="performace">Performance</label>
                    <input type="number" value={diploma.performance} onChange={handleChange} name="performance" id="performance" />
                </div>
            </div>
            <div className="save-button"><button type="submit">save</button></div>
          </form>

        </div>
      
    </div>
  )
}

export default DDModal
