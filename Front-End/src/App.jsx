import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
// import NavbarE from '../../Employer/components/navbar/Navbar'
import Navbar from './Components/Navbar/Navbar'
// import EmployerHome from '../../Employer/pages/home/EmployerHome'
import { useContext, useEffect } from 'react'
import { Context } from './Context/StoreContext'
// import PostJob from '../../Employer/pages/PostJob/PostJob'
// import MyJobs from '../../Employer/pages/MyJobs/MyJobs'
// import Login from '../../Employer/pages/login/Login'
import { useState } from 'react'
import Jobs from './pages/Jobs/Jobs'
import Internships from './pages/Internships/Internships'
import JobDetails from './pages/JobDetails/JobDetails'
import Login from './pages/Login/Login'
import Cookies from 'js-cookie'
import axios from 'axios'
import Apply from './pages/Apply/Apply'
import Footer from './Components/footer/Footer'
function App() {
  const { user, isLoggedIn, url } = useContext(Context);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    const token = Cookies.get('token_');
    const validate = async ()=>{
      if(token){
        const response = await axios.post(url+'/job_seeker/validate',{},{headers:{token}});
        if(response.data.success){
          setLoggedIn(true)
        }else{
          console.log(response.data.message);
        }
      }else{
        console.log("No token found")
        setLoggedIn(false)
      }
    }
    validate();
    
  },[Cookies.get('token_')]);

  useEffect(()=>{
    const token = Cookies.get('token_');
    const validate = async ()=>{
      if(token){
        const response = await axios.post(url+'/job_seeker/validate',{},{headers:{token}});
        if(response.data.success){
          setLoggedIn(true)
        }else{
          console.log(response.data.message);
        }
      }else{
        console.log("No token found")
        setLoggedIn(false)
      }
    }
    validate();
  },[])

 



  return (
    <div className='app'>
      {loggedIn ? (
      <>
            <Navbar setLoggedIn={setLoggedIn} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/jobs' element={<Jobs/>}/>
              <Route path='/internships' element={<Internships/>}/>
              <Route path='/jobs/details/:id' element={<JobDetails/>}/>
              <Route path='/jobs/apply/:id' element={<Apply/>}/>
            </Routes>
            <Footer/>
           </>): <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
    </div>
  )
}

export default App
