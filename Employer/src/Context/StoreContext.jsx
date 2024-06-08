import { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
export const Context = createContext();
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const StoreContext = (props)=>{
    const [user, setUser]=useState('EMPLOYEE');
    const [all_jobs, setAll_jobs] = useState();
    const [filteredJobs, setFilteredJobs]=useState();
    const url = 'https://encryptix-projects.onrender.com';
    const [token, setToken]= useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jobseeker, setJobseeker]=useState({name:'', email:''})
    const [filterOptions, setFilterOptions]= useState({});
    const [resume, setResume] = useState({
      education: [],
      job:[],
      project:[],
      intern:[],
      skills:[],
  });
  const [myJobs, setMyJobs]= useState(); 
    const navigate = useNavigate();



  //--------------- fetching all jobs ------------------------------//
    const getJobs = async() =>{
      const token = Cookies.get('token_')
        try {
          // const response =  await axios.post(url+'/job/all-jobs',{},{headers:{token}});
          // setAll_jobs(response.data);
          // console.log("all jobs",all_jobs)
        } catch (error) {
          console.log("Failed to get all jobs")
        } 
    }  



    //------------------------ Filtering jobs --------------------//
   useEffect(()=>{
   
    const filterJobs = async()=>{  
      try {
    const filteredData = await axios.post(url+'/job/filtered-jobs',filterOptions);
    setFilteredJobs(filteredData.data.data);
      } catch (error) {
        console.log('Something went wrong !')
      } 
    
  }
  filterJobs()
   },[filterOptions])
      
   
    
    useEffect(()=>{
          async function loadData(){
            getJobs();
            if(localStorage.getItem('token')){
              try {
                let token = localStorage.getItem("token");
               const response = await axios.post(url+'/employer/validate',{},{headers:{token}});
              if(response.data.success){
                setToken(localStorage.getItem("token"));
                setIsLoggedIn(true);
              }else{
                navigate('/login');
              }
              
              } catch (error) {
                console.log(error)
              }
            }
        }
    loadData();
    },[])




    //------------------- Fetching Resume ------------------//

    useEffect(() => {
      const fetchResume = async () => {
        const token = Cookies.get('token_')
          try {
              const response = await axios.get(`${url}/job_seeker/get/resume`, { headers: { token } });

              if(response.data.success){
                  console.log("data set by fetchResume")
                  setResume(response.data.data);
                  setJobseeker({name:response.data.name,email:response.data.email})
              }
          } catch (error) {
              console.error("Error fetching resume data:", error);
          }
      };

      fetchResume();
  }, []);



  //----------------- update resume --------------------//
  const updateResume = async (updatedResume) => {
    const token = Cookies.get('token_');
    try {
      const response = await axios.patch(`${url}/job_seeker/apply/resume`, { resume: updatedResume }, { headers: { token } });
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };
  


    
   
    


    const values = {
        user,
        setUser,
        url,
        all_jobs,
        setToken,
        token,
        isLoggedIn,
        setIsLoggedIn,
        filterOptions,
        setFilterOptions,
        filteredJobs,
        getJobs,
        resume,
        setResume,
        updateResume,
        myJobs, setMyJobs,jobseeker
        
    };


    return(
        <Context.Provider value={values}>
            {props.children}
        </Context.Provider>
    )
}
export default StoreContext;

