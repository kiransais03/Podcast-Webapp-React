import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Button from '../../components/Common-Components/Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

function Profilepage() {
  let userdetails = useSelector((state)=>{return state.userdata.user1});  //state.userdata(store name).user1(In store object user1 is a property)
  let [loading,setLoading]=useState(false);

  function handleLogout () {
    setLoading(true);
    signOut(auth)
    .then(()=>{toast.success("User Account Logged Out!"); setLoading(false);})
    .catch((error)=>{toast.error("Some Error Occurred:",error.message); setLoading(false);})
  }

  console.log("My user",userdetails);
  return (<>
    {userdetails && (<div>
      <h1>{userdetails.name}</h1>
      <h1>{userdetails.email}</h1>
      <h1>{userdetails.uid}</h1>
      <Button onClick={handleLogout} text={loading ? "Signing Out...." : "Logout"}/>
    </div>)}
    </>
  )
}

export default Profilepage
