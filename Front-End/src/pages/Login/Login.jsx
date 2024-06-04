import React,{useContext, useEffect, useState} from 'react'
import './Login.css';
import axios from 'axios';
import { Context } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({loggedIn, setLoggedIn}) => {
    const {url} = useContext(Context);
    const [isAccount, setIsAccount] = useState(true);
    const [formData, setFormData] = useState({
        fname:'',
        password:'',
        email:''
    })
    const navigate = useNavigate();

const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({...prev, [name]:value}));
}

const handleSubmit = async (e)=>{
    e.preventDefault();
    let newUrl = ''
    if(isAccount){
        newUrl = url + '/job_seeker/login_jobseeker';
    }else{
        newUrl = url + '/job_seeker/register_jobseeker';
    }
    try {
        const response = await axios.post(newUrl, formData);
        
            if(response.data.success){
                setLoggedIn(true);
                navigate('/')
                Cookies.set('token_',response.data.token,{expires: 7, secure:true});
                console.log("token from login",Cookies.get('token'))
            }
         
        
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div className='login'>
        <h1>Job<span>Dekho</span></h1>
        <h2>{isAccount ? 'Login':"Register"}</h2>
        <form onSubmit={handleSubmit} >
            <div className="form-data">
                {isAccount ? null: <div className="name f-c">
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={handleChange} value={formData.value} name="fname" placeholder='Enter full name' />
                </div>}
                <div className="email f-c">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleChange} value={formData.value} name="email" placeholder='email' />
                </div>
                <div className="password f-c">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={handleChange} value={formData.value} name="password" placeholder='password'/>
                </div>
                <button type='submit'>{!isAccount?"Register":"Login"}</button>
                <hr />
               <div className='form-bottom'>{!isAccount ? "Already have an account?":"Don't have an account?"}
                    {!isAccount ? <span onClick={()=>setIsAccount(true)}> Login</span> :<span onClick={()=>setIsAccount(false)}> Sign up</span>}
               </div> 
            </div>
        </form>
    </div>
  )
}

export default Login
