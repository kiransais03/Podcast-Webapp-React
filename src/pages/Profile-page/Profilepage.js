import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Button from '../../components/Common-Components/Button/Button';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import { clearUser } from '../../slices/userSlices';
import Input from "../../components/Common-Components/Input/Input";
import "./profilepage-styles.css"
import { doc, updateDoc } from "firebase/firestore";
import {VscAccount} from "react-icons/vsc";
import { updatePassword } from "firebase/auth";
import { setUser } from '../../slices/userSlices';
import Fileinput from '../../components/Common-Components/Fileinput/Fileinput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


function Profilepage() {
  let userdetails = useSelector((state)=>{return state.userdata.user1});  //state.userdata(store name).user1(In store object user1 is a property)
  let [loading,setLoading]=useState(false);
  let [userName,setUserName] = useState("");
  let [userEmailid,setUserEmailid] = useState("");
  let [userPassword,setUserPassword] = useState("");
  let [userCnfpassword,setUserCnfpassword]=useState("");
  let [userUid,setUserUid]=useState("");
  let [userNumber,setUserNumber]=useState("");

  let [loading2,setLoading2] = useState(false);
  let [displayedit,setDisplayedit]=useState("")

  let dispatch=useDispatch();


  useEffect(()=>{
    if(userdetails)
    {
      setUserName(userdetails.name);
      setUserEmailid(userdetails.email);
      setUserUid(userdetails.uid);
      console.log(userdetails.number,"Number")
      setUserNumber(userdetails.number)
    }
  },[userdetails])

  function handleLogout () {
    setLoading(true);
    signOut(auth)
    .then(()=>{
      toast.success("User Account Logged Out!");  
      setLoading(false);
      dispatch(clearUser())
    })
    .catch((error)=>{toast.error("Some Error Occurred:",error.message); setLoading(false);})
  }


 async function handlenameUpdate() {

if(userdetails.name===userName) {
  toast.info("Please Update the name");
  return;
}
  try{
    const userdetailsref = doc(db, "users", userUid); //"users" is the db name in firestore and userUid file name

    await updateDoc(userdetailsref, {
      name: userName,
    });
   
    dispatch(setUser({
      ...userdetails,
      name:userName,
    }))
    toast.success("Name updated successfully.")

  }
  catch(error) {
    toast.error("Some error occured,please retry",error.message);
    console.log(error.message);
  }
}


async function handlenumberUpdate() {
  if(userNumber?.length===10)
  {
    // alert(userdetails.number)
    if(userdetails.number===userNumber) {
      toast.info("Please Update the number");
      return;
    }
    
      try{
        const userdetailsref = doc(db, "users", userUid); //"users" is the db name in firestore and userUid file name
    
        await updateDoc(userdetailsref, {
          number: userNumber,
        });
        dispatch(setUser({
          ...userdetails,
          number:userNumber,
        }))
       
        toast.success("Mobile Number updated successfully.")
    
      }
      catch(error) {
        toast.error("Some error occured,please retry",error.message);
        console.log(error.message);
      }
  }
  else {
    toast.error("Please enter valid mobile number")
  }
  
  }

  async function handlepasswordUpdate() {
    if(userPassword.length>=6 && userPassword===userCnfpassword)
    {
        try{
          const user = auth.currentUser;
          
          updatePassword(user, userPassword).then(() => {
           toast.success("Password updated successfully");
          }).catch((error) => {
            toast.error("Some error occurred,please try again",error.message);
            console.log(error.message)
          });
      
        }
        catch(error) {
          toast.error("Some error occured,please retry",error.message);
          console.log(error.message);
        }
    }
    else {
      toast.error("Please enter valid password in both the fields")
    }
    
    }

    function displayimguploadeditfunc(files) {
      setDisplayedit(files);
   }



//Display image upload
async function handledisplayimgupdate() {
  
  if(displayedit)
  {
    try {
     setLoading2(true);

     const profilepicref = ref(storage, `userprofilepics/${auth.currentUser.uid}/${displayedit[0].name}${Date.now()}`);

     await uploadBytes(profilepicref, displayedit[0]).then((snapshot) => {
       console.log('Uploaded profile picture');
      });

      const profilepicUrl = await getDownloadURL(profilepicref);


    const podcastdetailsref = doc(db, "users", userdetails.uid); //"users" is the db name in firestore and userUid file name
  
      await updateDoc(podcastdetailsref, {
          profilepic:profilepicUrl,
      });
     
    
    toast.success("Display Image Uploaded Successfully");
    setLoading2(false);
    setDisplayedit("")
    // setDummystate("dummycallfor-re-render");
    
  }
  catch(error) {
    console.log(error);
    toast.error("Some error occurred :",error.message);
    setLoading2(false);
  }
  }
  else {
    
     if(!displayedit)
    {
      toast.error("Please select image")
    }

  }

}



  console.log("My user",userdetails);
  return (<>
    {userdetails && (<div className='profile-form'>
      <div className='head-data'>
      <h2><VscAccount/> User Account Information</h2>
      <p>Here you can edit information about yourself.Data will be updated immediately</p>
      </div>

      <div className='profile-input-div profile-img-div'>
        <img src={userdetails.profilepic} style={{width:"80px",height:"80px",borderRadius:"40px"}} alt="profile"/>
        <Fileinput text="Click To Select New Profile Pic" accept="image/*" id="display-img" filehandlingfunc={displayimguploadeditfunc}/>
     <button style={{margin:"15px"}} className='profilebtns btn btn-primary' onClick={handledisplayimgupdate}>
      {loading2 ?<div><div className="spinner-border spinner-border-sm" role="status">
     <span className="visually-hidden">Loading...</span>
     </div>
     <div className="spinner-grow spinner-grow-sm" role="status">
     <span className="visually-hidden">Loading...</span>
    </div></div>:"Update Profile Pic"}</button>
      </div>


      <div className='profile-input-div'>
       <Input type={"text"} placeholder={"Full Name"} state={userName} setState={setUserName} />
       <button className='profilebtns btn btn-primary' onClick={handlenameUpdate}>Update Name</button>
      </div>

      
      <div className="profile-input-div">
      <Input type={"text"} placeholder={"EmailId"} disabled={true} state={userEmailid} setState={setUserEmailid} />
      </div>

      <div className='profile-input-div'>
      <Input type={"text"}  placeholder={"Add Mobile Number"} state={userNumber} setState={setUserNumber} />
      <button className='profilebtns btn btn-primary' onClick={handlenumberUpdate}>Add / Update Mobile Number</button>
      </div>

      <div className='profile-input-div'>
      <Input type={"password"} placeholder={"Create New Password"} state={userPassword} setState={setUserPassword} />
      <Input type={"password"} placeholder={"Confirm New Password"} state={userCnfpassword} setState={setUserCnfpassword} />
      <button className='profilebtns btn btn-primary' onClick={handlepasswordUpdate}>Update Password</button>
      </div>
     
     <div className='logout-btn'>
      <Button onClick={handleLogout} text={loading ? "Signing Out...." : "Logout"}/>
      </div>
    </div>)}
    </>
  )
}

export default Profilepage
