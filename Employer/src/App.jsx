import { Routes, Route } from 'react-router-dom'
import './App.css'
// import Home from './pages/Home/Home'
import NavbarE from './components/navbar/Navbar'
// import Navbar from './Components/Navbar/Navbar'
import EmployerHome from './pages/home/EmployerHome'
import { useContext } from 'react'
import { Context } from './Context/StoreContext'
import PostJob from './pages/PostJob/PostJob'
import MyJobs from './pages/MyJobs/MyJobs'
import LoginE from './pages/login/Login'
import { useState } from 'react'
import Applications from './pages/applications/Applications'
// import Jobs from './pages/Jobs/Jobs'
// import Internships from './pages/Internships/Internships'
// import JobDetails from './pages/JobDetails/JobDetails'
function App() {
  const {  isLoggedIn } = useContext(Context);
  return (
    <div className='app'>
      <>

         
            {/* ------------Empolyer------------------ */}
            {isLoggedIn ? (<> <NavbarE />
              <Routes>
                {/* <Route path='/' element={<EmployerHome />} /> */}
                <Route path='/post-job' element={<PostJob />} />
                <Route path='/post-job/update/:id' element={<PostJob />} />
                <Route path='/' element={<MyJobs />} />
                <Route path='/applications' element={<Applications/>}/>
              </Routes></> ): <LoginE/>
             }
      </>


    </div>
  )
}

export default App
