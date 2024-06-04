const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const jobCollections = getDB().collection("jobs");
const userCollection = getDB().collection("user");
const jobSeekersCollection = getDB().collection('jobSeekers')



//---------------------- Post a Job -----------------------------//
const postJob = async (req, res) => {
  const body = req.body;
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'No token found' });
  }
  try {
    const verified_token = jwt.verify(token, process.env.JWT_KEY);
    body.createdAt = new Date();
    const data = await jobCollections.insertOne(body);
    if (data.insertedId) {
      const employer = await userCollection.findOne({ _id: new ObjectId(verified_token.id) });
      await jobCollections.updateMany({ _id: data.insertedId }, { $set: { job_by: employer._id } });
      await userCollection.updateOne(employer, { $push: { my_jobs: data.insertedId } });
      return res.status(200).json({ success: true, message: 'Job added', data: data });
    } else {
      return res.status(404).json({ message: 'Cannot insert! Try again later', status: false });
    }
  } catch (error) {
    console.error(error);
   return res.json({ success: false, message: 'Error occurred in posting a job' });
  }
};




//-------------------------------- get all jobs ------------------------------------//
const getAllJobs = async (req, res) => {
  const jobs = await jobCollections.find({}).toArray();
  return res.send(jobs);
};





//-------------------------- delete job by id ------------------------------------//

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobCollections.findOne({ _id: new ObjectId(jobId) });
    if (job._id) {
     const response = await jobCollections.deleteOne(job);
     return res.status(200).json({ success: true, message: 'Job deleted successfully' });
    }
  } catch (error) {
    console.error(error);
   return res.json({ success: false, message: 'Error occurred' });
  }
};




//-------------- fetching the jobs by id -------------------------//
const getJobById = async (req,res)=>{
  try {
    const jobId = req.params.id ;
    const job = await jobCollections.findOne({_id: new ObjectId(jobId)});
    return res.json({success:true, job:job});
  } catch (error) {
    console.log("Error")
    return res.json({success:false, message:"Error"})
  }
}



//---------------- delete job ------------------------//

const deleteJOB = async(req,res)=>{
  try {
   const response = await jobCollections.updateMany({},{$set: {type:"internship"}});
     return res.json({success:true, message:'updated'});
  } catch (error) {
   return res.json({success:false, message:"Error occured"})
  }
 
}





//----------------------------- Get job according to minimum salary -----------------------------//

const getJobsByMinSalary = async (req, res) => {
  try {
    let minSalary = req.query.min_salary;
    const jobs = await jobCollections.find({ min_salary: { $gte: minSalary } }).toArray();
   return res.json({ success: true, data: jobs });
  } catch (error) {
   return console.error(error);
  }
};





//---------------------------------------- Get Job according to Job profile -------------------------------//
const getJobsByProfile = async (req, res) => {
  try {
    let jobProfile = req.body.profile;
    const jobs = await jobCollections.find({ title: jobProfile }).toArray();
   return res.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ success: false, message: "Job not found" });
  }
};




//-------------------------------- Filter Jobs ----------------------------------//
const filterJobs = async (req,res)=>{
  const {profile, location, work_from_home, part_time, salary, experience} = req.body;
  if(work_from_home===''){
    
  }
    let query = {};

    Object.keys(req.body).forEach(key => {
      const value = req.body[key];
      if (value !== '' && value !== undefined && value.length !==0 && key!=='') {
        if(key==='title'){
          query[key]={$in:value};
        }else if(key==='location'){
          query[key]={$in:value};
        }else if(key==='min_salary'){
          query[key]={$gte: Number(value)};
        }
        else{
          query[key] = value;
        }
      } 
    });
  try {
      const filtered_jobs = await jobCollections.find(query).toArray();
     return res.json({success:true, data:filtered_jobs});
  } catch (error) {
    return res.json({success:false, message:'something is wrong'});
  }

}


//---------------------------- Fetch job posted by employer ----------------------------//
    const getMyJobs = async (req,res)=>{
      const {token} = req.headers;
      const verified_token = jwt.verify(token,process.env.JWT_KEY);
      try {
        const myJobs = await jobCollections.find({job_by: new ObjectId(verified_token.id)}).toArray();
       return  res.json({success:true, data:myJobs});
      } catch (error) {
        console.log(error); 
        return res.json({success:false, message:"coudn't find jobs"})
      }       
    }



    //------------------------- after applying update job info -----------------------------//

    const applyForJob = async (req,res)=>{
     const {token} = req.headers;
     const {id} = req.body;
     const userId = await jwt.verify(token, process.env.JWT_KEY).id;
     if(!userId){
      return res.json({success:false, message:"user not found"});
     }
     try { const hasApplied = await jobCollections.findOne({_id: new ObjectId(id), applied_by: userId})

      if(hasApplied){
        return res.json({success:false, message:"user has already applied for the job"})
      }
     
      const response = await jobCollections.updateOne({ _id: new ObjectId(id) },{ $push:{applied_by: userId} } );
       await jobSeekersCollection.updateOne({_id:new ObjectId(userId)},{$push:{applied_for:id}})
           if(response.modifiedCount>0){
            return res.json({success:true, message:"applied for the job"})
           }

     } catch (error) {
      return res.json({success:false, error})
     }
     
    }



    //----------------------- update job ----------------------------//

    const updateJob = async(req,res)=>{
      const {token} = req.headers;
      const {id} = req.params;
      // console.log("id",id);
      if(!token){
        return res.json({success:false, message:"no token found"});
      }
      const userId = await jwt.verify(token,process.env.JWT_KEY).id;
      if(!userId){
        return res.json({success:false, message:"invalid credentials"})
      }
      try {
         await jobCollections.updateOne({_id:new ObjectId(id)},{$set:req.body});
        res.json({success:true, message:"data updated successfully!"})
      } catch (error) {
        console.log("Error")
        return res.json({success:false, message:"Error"});
      }
      
    }



    //----------------------- respond to application -------------------//

    const respond = async(req,res)=>{
      const {selected, jobId, applicantId} = req.body;
      try {
        const isSelected = await jobCollections.findOne({
          _id: new ObjectId(jobId),
          selected:{$in:[applicantId]}});
          console.log("JobId",jobId, "applicantId",applicantId, "isSelected",isSelected);
        if(!isSelected){
          if(selected){
            const response = await jobCollections.updateOne({_id: new ObjectId(jobId)},
          {$set:{responded:true},
          $push:{selected:applicantId}});
          if (response.modifiedCount > 0) {
            return res.json({ success: true, message: "selected" });
          } else {
            return res.status(500).json({ success: false, message: "Failed to update job document" });
          }
          }else{
            const response = await jobCollections.updateOne({_id: new ObjectId(jobId)},
            {$set:{responded:true},
            $push:{rejected:applicantId}});
            if (response.modifiedCount > 0) {
              return res.json({ success: true, message: "rejected" });
            } else {
              return res.status(500).json({ success: false, message: "Failed to update job document" });
            }
          }
          
        } else {
          return res.json({ success: false, message: 'already selected' });
        }
        
       
      } catch (error) {
        console.log("Error")
      }

    }

    //------------------------ delete applicant ---------------------------//

    const deleteApplicant = async(req,res)=>{
        const { jobId} = req.body;
        const {id} = req.params;
        
        try {
          const response = await jobCollections.updateOne({_id: new ObjectId(jobId)},
          {$pull:{applied_by:id},
          $unset:{responded:true},
        }
        )
        if(response.modifiedCount > 0){
          return res.json({success:true, message:"application removed"});
        }else{
          return res.json({success:false, message:"failed to remove applicant"})
        }
        } catch (error) {
          console.log("error")
        }
        

    }



module.exports = { postJob, deleteApplicant, respond, updateJob, applyForJob ,getMyJobs, getJobById, getAllJobs, deleteJob, getJobsByMinSalary, getJobsByProfile, deleteJOB, filterJobs };
