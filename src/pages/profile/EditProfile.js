import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import "../../pages/profile/Profile.scss" 
import {toast} from "react-toastify"
import { updateUser } from '../../services/authService';
import ChangePassword from '../../components/changePassword/ChangePassword';

const EditProfile = () => {
    const [isLoading,setisLoading]=useState(false); 
    const user=useSelector(selectUser);
    const {email}=user  
    const navigate=useNavigate();

    useEffect(()=>{
        if(!email){
            navigate("/profile")

        }

    },[email,navigate])

    const initialState={
        name:user?.name,
        email:user?.email,
        phone:user?.phone,
        bio:user?.bio,
        photo:user?.photo,

    }
    const [profile,setProfile]=useState(initialState);
    const [profileImage,setProfileImage]=useState("");

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setProfile({...profile,[name]:value})
    }
    const handleImageChange=(e)=>{
        setProfileImage(e.target.files[0])
    }
    const saveProfile=async(e)=>{
        e.preventDefault();
        setisLoading(true);
        try{
            let imageURL;
            if(profileImage && (profileImage.type==="image/jpeg" || profileImage.type==="image/jpg"||profileImage.type==="image/png")){
                const image=new FormData();
                image.append('file',profileImage)
                image.append('cloud_name',"datybyr7x")
                image.append('upload_preset',"xrfaehjg")

                const response=await fetch("https://api.cloudinary.com/v1_1/datybyr7x//image/upload",{method:"post",
                body: image})
                const imgData=await response.json();
                imageURL=imgData.url.toString()
            } 
                
                toast.success("Image uploaded successfully")
                const formData={
                    name:profile.name,
                    phone:profile.phone,
                    bio:profile.bio,
                    photo:profileImage?imageURL:profile.photo,

                }
                const data=await updateUser(formData)
                console.log(data);
                toast.success("User updated successfully");
                setisLoading(false);
                navigate("/profile")


             

        }
        catch(error){
            console.log(error);
            setisLoading(false);
            toast.error("Image failed to upload")


        }
    }


  return (
    <div className='profile --my2'>
    {isLoading && <Loader/>}
    <Card cardClass={"card --flex-dir-column"}>
           <span className='profile-photo'>
            <img src={user?.photo} alt="profile pic "/>
           </span>
           <form className='--form-control --m' onSubmit={saveProfile}>
            <span className='profile-data'>
            <p>
                <label>
                    Name:
                </label>
                <input type='text' name="name" value={profile?.name} onChange={handleInputChange}/>
            </p>
            <p>
                <label>
                    Email:
                </label>
                <input type='text' name="email" value={profile?.email} disabled/> 
                <br>
                </br>
                <code>Email cannot be changed</code>
            </p>
            <p>
                <label>Phone:</label>
                <input type='text' name='phone' value={profile?.phone} onChange={handleInputChange}/>
            </p>
             <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
                <label>Photo:</label>
                <input type="file" name="image" onChange={handleImageChange}/>
            </p>
            <button className="--btn --btn-primary">Edit Profile</button>
            <div>
            </div>
            </span>
           </form>
            
           
           
        </Card>
        <ChangePassword/>
  </div>
  ) 

}

export default EditProfile