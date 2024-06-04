import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Context } from '../../Context/StoreContext';
import Cookies from 'js-cookie'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";

const Navbar = ({setLoggedIn}) => {
    const { setJobSeekerLoggedIn} = useContext(Context);
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const {setUser} = useContext(Context);
    const token = Cookies.get("token_")
   const logout = ()=>{
        Cookies.remove('token_');
        setLoggedIn(false);
   }

   

    return (
        <nav className='navbar' >
            <Link to='/'>
                <h3 className='logo'>Job<span>Dekho</span></h3>
            </Link>
            <div className="navbar-right">
                <ul className='links'>
                    <Link 
                        name='home' 
                        className={location.pathname === '/' ? "active" : ""} 
                        onClick={() => handleActive('home')} 
                        to="/">Home</Link>
                    <Link 
                        name='jobs' 
                        className={location.pathname === '/jobs' ? "active" : ""} 
                        onClick={() => handleActive('jobs')} 
                        to="/jobs">Jobs</Link>
                    <Link 
                        name='internships' 
                        className={location.pathname === '/internships' ? "active" : ""} 
                        onClick={() => handleActive('internships')} 
                        to="/internships">Internships</Link>
                </ul>
                <div>
                    {
                        !token ? <button onClick={logout}>Sign in</button> :
                        <div className='profile'>
                            <FaUserAlt />
                            <ul className='dropdown'>
                                <li>My profile</li>
                                <li onClick={logout}>Log out</li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            <div className="burger-menu">
            <GiHamburgerMenu onClick={()=>setShowSidebar(prev=>!prev)} />
            <div className={showSidebar ? "sidebar": "none"}>
                <div className="sidebar-top">
                <ul className='sidebar-links'>
                <p onClick={()=>setShowSidebar(false)}>X</p>

                <Link 
                        name='home' 
                        className={location.pathname === '/' ? "active" : ""} 
                        onClick={() => handleActive('home')} 
                        to="/">Home</Link>
                    <Link 
                        name='jobs' 
                        className={location.pathname === '/jobs' ? "active" : ""} 
                        onClick={() => handleActive('jobs')} 
                        to="/jobs">Jobs</Link>
                    <Link 
                        name='internships' 
                        className={location.pathname === '/internships' ? "active" : ""} 
                        onClick={() => handleActive('internships')} 
                        to="/internships">Internships</Link>
                   </ul>
                </div>
                <p onClick={logout}>logout <span><IoIosLogOut /></span></p>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;
