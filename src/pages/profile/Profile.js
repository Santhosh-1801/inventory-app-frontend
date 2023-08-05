import React, { useEffect, useState } from 'react'
import useRedirectLoggedOut from '../../customHook/useRedirectLoggedOut'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom' 
import "./Profile.scss"


const Profile = () => {
  useRedirectLoggedOut("/login")
  const dispatch=useDispatch();
  const [profile,setProfile]=useState(null);
  const [isLoading,setisLoading]=useState(false);

  useEffect(()=>{
   setisLoading(true);
   async function getUserData(){
    const data=await getUserProfile();
    console.log(data)

    setProfile(data);
    setisLoading(false);
    await dispatch(SET_USER(data))
    await dispatch(SET_NAME(data.name))

   }
   getUserData()
  },[dispatch])
  return <div className='profile --my2'>
    {isLoading && <SpinnerImg/>}
    <>
     {!isLoading && profile === null?(<p>Something went wrong</p>):(
        <Card className={"card --flex-dir-column"}>
           <span className='profile-photo'>
            <img src={profile?.photo} alt="profile pic "/>
           </span>
           <span className='profile-data'>
            <p>
                <b>Name: </b> {profile?.name}
            </p>
            <p>
                <b>Email: </b> {profile?.email}
            </p>
            <p>
                <b>Phone: </b> {profile?.phone}
            </p>
             <p>
                <b>Bio: </b> {profile?.bio}
            </p>
            <div>
                <Link to="/edit-profile">
                <button className='--btn --btn-primary'>Edit Profile</button>
                </Link>
            </div>



           </span>
        </Card>
     )}
    </>
   
    </div>
  
}

export default Profile