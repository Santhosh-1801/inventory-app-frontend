import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Card from "../../components/card/Card" 
import {MdPassword} from "react-icons/md"
import { Link,useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/authService'

const initialState = {
  password: "",
  password2: "",
};



const Reset = () => {

  const [formData,setformData]=useState(initialState);
  const {password,password2}=formData 

   const {resetToken}=useParams();

   const handleInputChange=(e)=>{
         const {name,value}=e.target;
         setformData({...formData,[name]:value})
   }
   const reset=async(e)=>{
    e.preventDefault();
    if(password !== password2){
            return toast.error("Password do not match")
        }
    if(password.length<6){
            return toast.error("Password must be more than 6 characters")
        }
        console.log(formData)
    const userData={
            password,password2
        }
        try {
            const data=await resetPassword(userData,resetToken);
            toast.success(data.message);
        } catch (error) {
            console.log(error.message);
            
        }
   }
  
  
  return <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <MdPassword size={35} color="black"/>
                    </div>
                    <h2>Reset Password</h2>
                    <form onSubmit={reset}>
                        <input type="password" placeholder='New Password' required name="password" value={password}onChange={handleInputChange}></input> 
                        <input type="password" placeholder='Confirm New Password' required name="password2" value={password2} onChange={handleInputChange}></input>
                        <button type='submit' className="--btn --btn-primary --btn-block">Reset Password</button>
                    </form>
                    
                    <span className={styles.register}>
                      <Link to="/">Home</Link> 

                      <Link to="/login" style={{marginLeft:"15px"}}>Login</Link>
                    </span>
                </div>
           </Card>
        </div>
    
}

export default Reset