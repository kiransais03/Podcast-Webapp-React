
import {useAuthState} from "react-firebase-hooks/auth";  //This is the hook from react-firebase npm
import { Navigate, Outlet } from 'react-router-dom';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import "./Loader/loaderstyles.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDoc } from "firebase/firestore";
import { setUser } from "../slices/userSlices";
import { deleteUser } from "firebase/auth";


let ct;
function Privaterouteslogin() {

  let [user,loading,error]=useAuthState(auth);  //Without this react-hook also we can know in what state the Authentication is in.
                                                    //This hook will make it easy to get those values in a single line.
  
  const [showToast, setShowToast] = useState(true); 

  let dispatch=useDispatch();
 
  useEffect(()=>{ct=0;},[])

  // useEffect(() => {
  //   if (user) {
  //     let isMounted = true;
  
  //     async function fetchData() {
  //       try {
  //         const userDoc = await getDoc(db, "users", user.uid);
  //         const userData = userDoc.data();
  
  //         if (isMounted) {
  //           dispatch(setUser({
  //             name: userData.name,
  //             email: user.email,
  //             uid: user.uid,
  //             number: user.number,
  //             profilepic: user.profilepic,
  //           }));
  //         }
  //       } catch (error) {
  //         // Handle Firestore data retrieval error
  //         // For example, you can log the error message
  //         console.error("Firestore data retrieval error:", error);
  //         deleteUser(user).then(() => {
  //           console.log("account deleted")
  //         }).catch((error) => {
  //           console.log("Account an into a problem");
  //           toast.error("Account an into a problem",error.message);
  //         });
  //         toast.error("Some error occured,white creating account,Please retry");
  //         console.log(error.message)
         
  //         dispatch(setUser({})); // Clear user data from state
  //       }
  //     }
  
  //     fetchData();
  
  //     return () => {
  //       isMounted = false;
  //     };
  //   }
  // }, [user]);
  
  
  

  if(loading)
  {
   return (<div><span className="loader"></span></div>)
  }
   else if(user)
   {
    if (showToast && ct===0) {
        toast.info("Please Logout if you want to Signin with different account");
        // alert("Please Logout to Signin with different account")
        console.log(user,loading,error,"checking")
        setShowToast(false);
        ct++;
    }
     
    return(
    <Navigate to="/profile" replace/>  )
    //In the Navigate component "replace" attribute is used
    //to not log the previous page into the browser history.Because in this condition without login or with some error
    //if user tries to come to this private page(Profile page etc.) It will redirect to signup page.
    //And then if user press the Back button in the browser,It will not take to the Profile page because
    //It is not logged into the browser history because of "replace" attribute
                                            
   }
  return (
   <Outlet/>
  )

}

export default Privaterouteslogin;
