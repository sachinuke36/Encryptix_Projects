import React, { useContext, useEffect, useState } from 'react'
import './Applications.css'
import { Context } from '../../Context/StoreContext'
import axios from 'axios';
import ApplicationCard from '../../components/ApplicationCards/ApplicationCard';

const Applications = () => {
    const { all_jobs, url, myJobs, setMyJobs } = useContext(Context);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [userInfo,setUserInfo] = useState([]);
    const [complete, setComplete] = useState([]);
    let arr = [];
    let seekerIds  = []
    // let complete = []

    
   




    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const response = await axios.get(url + '/job/my_jobs', { headers: { token } })
                if (response.data.data) {
                    setMyJobs(response.data.data);
                    setLoading(false)
                }
            } catch (error) {
                console.log("coudn't fetch my jobs")
            }
        }
        getMyJobs()

    }, [])


   useEffect(()=>{
    myJobs?.map((job)=>{
        if(job.applied_by !== undefined){
            seekerIds.push(job.applied_by);
            arr.push({id:job._id,applied_by:job.applied_by})
        }
    })

    const getSeekerInfo = async () => {
        try {
          const response = await axios.get(`${url}/job/jobseekers/info/${seekerIds.join(',')}`);
          setUserInfo(response.data.data)
        } catch (error) {
          console.error('Error fetching job seeker info:', error);
        }
      };
      
      getSeekerInfo()
   },[myJobs]);

useEffect(()=>{
   
    if(myJobs && userInfo){
        let completeArray =[]
    for(let job of myJobs){
        for(let user of userInfo){
            if(job.applied_by !== undefined){
                job.applied_by.map((id)=> {
                   if(id === user.id){
                    completeArray.push({...user,jobId:job._id})
                   } 
                })
            }
        }
    }
    setComplete(completeArray)
}
},[userInfo,myJobs])





    if (loading) {
        return (<div className='loading-box'><div className="loading"></div>
            <h2 style={{ textAlign: 'center', margin: '2px' }} > Loading</h2></div>)
    }

   

// arr =[{jobId:,applied:}]





    return (
        <div className='applications'>
            <h1>Job Applications</h1>
                <div className="application-cards">
                        {
                            complete?.length > 0 ? complete.map((i, k) => (
                                <ApplicationCard key={k} name={i.name} jobId={i.jobId} id={i.id} email={i.email} resume={i.resume} />
                            )) : <p>No applications found.</p>
                        }
                     
                   
                </div>
        </div>
    )
}

export default Applications
