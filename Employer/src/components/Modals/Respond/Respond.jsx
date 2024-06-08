import './Respond.css';
import React, { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Context } from '../../../Context/StoreContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Respond = ({ email, setShowRespond, isSelected, jobId, id }) => {
    const {url} = useContext(Context);
  const form = useRef();
  

  const token = localStorage.getItem("token");
      const response = async ()=>{
        try {
            const res = await axios.patch(url+'/job/my_jobs/respond',{selected:isSelected, jobId:jobId, applicantId:id},{headers:{token}})
            return  res.data
        } catch (error) {
            toast.error(error);
        }
      }

  const sendEmail = async(e) => {
    e.preventDefault();
    const Params = {
        to_email: email,
        from_name: form.current.from_name.value,
        message: form.current.message.value,
      };
      const res = await response();
      console.log(res.message);
      if(  res.message ==='selected' || res.message === 'rejected'){
      emailjs
            .send('service_254tyx8', 'template_olmtc5o', Params, 'hvjjzrtekN_1vQ6it')
            .then(
                () => {
                    toast.success('SUCCESS!');
                  },
                  (error) => {
                    toast.error(error.text);
                  },
                );
             }else{
                toast.error("coudn't send message")
             }
    
  };

  return (
    <div>
    <div className="modal-wrapper" onClick={()=>setShowRespond(false)}></div>
    <div className="respond-content">
    <form ref={form} onSubmit={sendEmail} className="respond-form flex-col2">
     <div className="name flex-col">
     <label>Your Name</label>
      <input type="text" name="from_name" required />
     </div>
     <div className="message flex-col"> <label>Message</label>
      <textarea name="message" required /></div>
      <input type="submit" className='button' value="Send" />
    </form>
    </div>
    <ToastContainer/>
    </div>
  );
  
};

export default Respond;
