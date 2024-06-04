import React,{useContext, useEffect, useState} from 'react'
import './ApplicationCard.css';
import { Context } from '../../../../Front-End/src/Context/StoreContext';
import ResumeModal from '../Modals/Resume/ResumeModal';
import Respond from '../Modals/Respond/Respond';
import axios from 'axios'

const ApplicationCard = ({name,email,resume,jobId, id}) => {
    const { all_jobs, url, myJobs, setMyJobs } = useContext(Context);
    const jobInfo = myJobs.filter((i)=> (i._id ===jobId))
    const [showResume, setShowResume] = useState(false);
    const [showRespond, setShowRespond] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const token = localStorage.getItem("token")
    // const [responded, setResponded] = useState(false);

console.log("myJobs",myJobs);
console.log("jobInfo", jobInfo, jobInfo?.map(i => i.rejected && i.rejected.includes(id))[0]);

const deleteApplication =async(e)=>{
  await axios.post(url+'/job/my_jobs/remove_applicant/'+id,{jobId:jobId},{headers:{token}})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err))
}
  return (
    <div className='application-card'>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Applied to: {jobInfo.map((i)=>(i.title))}</p>
        <div className="button-box">
            <button onClick={()=>setShowResume(true)}>Resume</button>
            {showResume ? <ResumeModal resume={resume} setShowResume={setShowResume}/>:null}
            {showRespond ? <Respond isSelected={isSelected} jobId={jobId} id={id} email={email}  setShowRespond={setShowRespond}/>:null}
            <button onClick={()=>{
              setIsSelected(true)
              setShowRespond(true)
              }}>select</button>
            <button onClick={()=>{
              setIsSelected(false);
              setShowRespond(true)
              }}>Reject</button>
            <button onClick={deleteApplication}>Delete</button>
              
                <p>
    {jobInfo?.map(i => {
        if (i.responded) {
            return i.rejected && i.rejected.includes(id) ? <p style={{color:"red"}}>Rejected</p> : <p style={{color:"green"}}>Selected</p>;
        } else {
            return "";
        }
    })}
     </p>
        </div>
    </div>
  )
}

export default ApplicationCard
