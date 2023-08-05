import React, { useState } from 'react'
import Card from '../../components/card/Card'; 

import{FaEnvelope, FaPhoneAlt, FaTwitter} from "react-icons/fa"
import{GoLocation} from "react-icons/go" 
import axios from "axios";
import { toast } from 'react-toastify';


const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;
const Contact = () => {
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");
  const data={
    subject,
    message,
  }
  const sendEmail=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(`${BACKEND_URL}/api/contactus`,data)
      setSubject("");
      setMessage("");
      toast.success(response.data.message)
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  return (<div className='contact'>
    <h3 className='--mt'>Contact Us</h3>
    <div className='section'>
        <form onSubmit={sendEmail}>
            <Card cardClass="card">
            <label>Subject</label>
            <input type='text' name="subject" placeholder='Subject' required value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            <label>Message</label>
            <textarea cols="30" rows="10" name="message" placeholder='Message' required value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button className='--btn --btn-primary'>Send Message</button>
            </Card>

        </form>
        <div className='details'>
            <Card cardClass={"card2"}>
            <h2>CONTACT INFORMATION</h2>
            <p>Fill the form and contact us throw the mail or phone below</p>
            <div className='icons'>
                <span>
                    <FaPhoneAlt/>
                    <p>+91 6383114413</p>
                </span>
                 <span>
                    <FaEnvelope/>
                    <p>santhoshhodge@gmail.com</p>
                </span>
                <span>
                  <GoLocation/>
                  <p>Tirupur,Tamilnadu</p>
                </span>
                 <span>
                  <FaTwitter/>
                  <p>@santhoshhodge</p>
                </span>

            </div>
            </Card>
        </div>
    </div>
  </div>
  )
}

export default Contact