import React, { useContext, useEffect, useState } from 'react'
import './Internships.css';
import { Context } from '../../Context/StoreContext';
import JobCard_Jobs from '../../Components/JobCard_Job/JobCard_Job';
import Filter from '../../Components/Filters/Filters';

const Jobs = () => {
    const {all_jobs,filteredJobs} = useContext(Context);
    const [loading, setLoading]= useState(true);
    
    useEffect(() => {
      if (filteredJobs) {
          setLoading(false);
      }
  }, [filteredJobs]);

  if (loading) {
      return (<div className='loading-box'> <div className="loading">
        
      </div>
      <h2 style={{textAlign:'center', margin:'2px'}} > Loading</h2>
        </div>)
  }

  return (
    <div className='jobs'>
      <h1> Internships for you</h1>
      <div className="jobs-content">
      <div className="left-filters">
        <Filter all_jobs={all_jobs}/>
      </div>

      <div className="show-jobs">
        { filteredJobs?.filter((item)=>item.type==='internship')?.map((item,i)=>(
        <JobCard_Jobs key={i}
         title={item.title} 
         company={item.company}
         location={item.location}
         min_salary={item.min_salary}
         max_salary ={item.max_salary}
         experience = {item.experience}
         start_date = {item.start_date}
         type={item.type}
         id={item._id}
         skills = {item.skills}
            />
        ))}
      </div>
      </div>
     
    </div>
  )}


export default Jobs
