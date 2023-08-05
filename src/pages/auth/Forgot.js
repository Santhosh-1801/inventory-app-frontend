import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from "../../components/card/Card" 
import {AiOutlineMail} from "react-icons/ai"
import { Link } from 'react-router-dom'
import { forgotPassword, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'

const Forgot = () => {
  const [email,setEmail]=useState("")

  const forgot=async(e)=>{
    e.preventDefault();
    if(!email){
        return toast.error("Please add email");
    }
    if(!validateEmail(email)){
        return toast.error("Please enter valid email");
    }
    const userData={
        email,
    }
    await forgotPassword(userData);
    setEmail("")

  }

  return <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <AiOutlineMail size={35} color="black"/>
                    </div>
                    <h2>Forgot Password</h2>
                    <form onSubmit={forgot}>
                        <input type="text" placeholder='Email' required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input> 
                        <button type='submit' className="--btn --btn-primary --btn-block">Get Reset Mail</button>
                    </form>
                    
                    <span className={styles.register}>
                      <Link to="/">Home</Link> 

                      <Link to="/register" style={{marginLeft:"15px"}}>Register</Link>
                    </span>
                </div>
           </Card>
        </div>
    
}

export default Forgot