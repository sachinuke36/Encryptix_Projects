import React, { useState, useContext} from 'react'
import './Navbar.css'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { IoNotifications } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Context } from '../../Context/StoreContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {token, setIsLoggedIn, setUser} = useContext(Context)  ;
    const [showSideBar, setShowSideBar] = useState(false)  

    const logOut = ()=>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login')
        
    }
    const gotoJobSeeker = ()=>{
        setUser("EMPLOYEE");
        navigate('/')
    }
    
  return (
    <nav className='navbar'>
     <Link to='/'> <h3 className='logo'>Job<span>Dekho</span></h3></Link>
      <div className="navbar-right">
        <ul className='links'>
            {/* <Link to="/" 
             className={location.pathname==='/'? 'active':''}>Home </Link> */}

            <Link to="/"
            className={location.pathname==='/'? 'active':''}>My Jobs</Link>

            <Link to="/applications"
                className={location.pathname==='/applications'? 'active':''}>Applications</Link>

            <Link to="/post-job"
                className={location.pathname==='/post-job'? 'active':''}>Post a Job</Link>
        </ul>
        {
            !token ? <button>Sign Up</button>:<div className='profile'> <FaUserAlt />
            <ul className='dropdown'>
                <li>My profile</li>
                <li onClick={gotoJobSeeker}>For Job seeker</li>
                <li onClick={logOut}>Log out</li>
            </ul>
            </div> 
        }
        
            
      </div>
      <div className="burger-menu">
        <GiHamburgerMenu onClick={()=>setShowSideBar(prev=>!prev)} />
        </div>
        <div className={showSideBar ? 'side-bar':"none"}>
         {showSideBar ?  <p className='remove' onClick={()=>setShowSideBar(prev=>!prev)}>X</p>:null}
        {/* <Link to="/" 
             className={location.pathname==='/'? 'active':''}>Home </Link> */}

            <div className='sidebar-links'>
            <div className='flex-col'>
            <Link to="/"
            className={location.pathname==='/'? 'active':''}>My Jobs</Link>

            <Link to="/applications"
                className={location.pathname==='/applications'? 'active':''}>Applications</Link>

            <Link to="/post-job"
                className={location.pathname==='/post-job'? 'active':''}>Post a Job</Link>
            </div>

            <div onClick={logOut} className='logout-box'>
                <p>logout</p>
               <IoIosLogOut className='logout' style={{color:"black"}} />
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
