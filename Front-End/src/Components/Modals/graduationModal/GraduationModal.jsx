import React, { useEffect, useContext } from 'react'
import './GraduationModal.css'
import { Context } from '../../../Context/StoreContext';
const GraduationModal = ({resume, setResume ,graduation,setGraduation}) => {
    const { url, updateResume } = useContext(Context);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setResume(prev=>({...prev, education:[...(prev?.education)||[], {graduation}]}))
        updateResume();
    }
    const handleChange = (e)=>{
        const field = e.target.name;
        let value = e.target.value;
        if(field==='start_year' || field==='end_year' || field==='performance'){
            value = Number(value);
        }
        setGraduation(prev=>({...prev,[field]:value}))

    }
    

  return (
    <div className='graduation'>
        <div className="modal-wrapper"></div>
        <div className="gradModal_Content">
        <h2>Graduation details/ Post graduation details</h2>
      <form onSubmit={handleSubmit} className='grad-inputs' >
            <div className="college-box flex-col">
                <label htmlFor="college">College</label>
                <input className='college-name' onChange={handleChange} value={graduation.value} name='college_name' type="text" placeholder='e.g. IIT Kharagpur' />
            </div>
            <div className="duration flex">
                <div className="start_year flex-col">
                    <label htmlFor="start year">Start year</label>
                    <input type="number" name="start_year" onChange={handleChange} value={graduation.value}/>
                </div>
                <div className="end_year flex-col">
                    <label htmlFor="end year">End year</label>
                    <input type="text" name="end_year" onChange={handleChange} value={graduation.value} />
                </div>
            </div>
            <div className="degree_stream flex">
                <div className="degree flex-col">
                    <label htmlFor="degree">Degree</label>
                    <input type="text" onChange={handleChange} value={graduation.value} name="degree" required placeholder='e.g. B.Tech' />
                </div>
                <div className="stream flex-col">
                    <label htmlFor="stream">Stream</label>
                    <input type="text" name="stream" onChange={handleChange} value={graduation.value} required placeholder='e.g. economics' />
                </div>
            </div>
            <div className="personal_performance flex">
                <div className="performance flex-col">
                <label htmlFor="performance">Performance Scale</label>
                <select name="performance_scale" onChange={handleChange} value={graduation.value} >
                    <option value="percentage">Percentage</option>
                    <option value="cgpa">CGPA(Scale of 10)</option>
                </select>
                </div>
                <div className="performance flex-col">
                    <label htmlFor="performance">Performance</label>
                    <input type="number" name="performance" onChange={handleChange} value={graduation.value} />
                </div>
            </div>
            <button type='submit' >Save</button>
      </form>
      </div>
    </div>
  )
}

export default GraduationModal
