
import './App.css';
import React,{useEffect, useState} from 'react';
import {Routes,Route} from "react-router-dom";
import Signuppage from './pages/Signup-page/Signuppage';
import Loginpage from './pages/Login-page/Loginpage';
import Header from './components/Common-Components/Header/Header';
import Profilepage from "./pages/Profile-page/Profilepage"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import {auth,db} from "./firebase"
import { useDispatch } from 'react-redux';
import {setUser} from "./slices/userSlices";
import { doc } from "firebase/firestore"; 
import Privateroutes from './components/Privateroutes';
import Startapodcastpage from './pages/StartAPodcast-page/Startapodcastpage';
import Podcastspage from './pages/Podcasts-page/Podcastspage';


function App() {

  let dispatch=useDispatch();

  //In this useEffect we are calling the "onAuthStateChanged" function.This will be triggered when there is 
  //any small change in the user login data.That means if the user Login,Logout,or Clicked on Login 
  //And it is loading,Clicked on Logout it is loading,Any error during Login or Logout.This function
  //will be triggered.


  //Because of this function even we refresh the page,this function will be run and get the Login 
  //user data from the Firebase Auth if the user is Still logged in(Within the expiry time)
  //And gets all the data from "onSnapshot" function which is written inside the above one,
  //from Firebase Firestore, and adds the data to the redux using dispatch.

  //By this even if we close and open the browser if the login is not expired,User will be automatically
  //be logged in.
  
  useEffect(() => {   
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => { //If any updates in Auth this function will be triggered
      if (user) {
        console.log(user,"this is the onAuthstatechange user data")
        const unsubscribeSnapshot = onSnapshot(   //If any updates in Firestore db of Authorization of particular account this function will be triggered
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Some error occurred:", error);
          }
        );
  
        return () => {
          unsubscribeSnapshot();  //Cleanup function to the realtime Firestore db listener after the component unmounts.
        };
      }
    });
  
    return () => {
      unsubscribeAuth();  //Cleanup function to the realtime Auth listener after the component unmounts.
    };
  }, []);
  

  return (
   <div className='main'>
    <Header/>
      <ToastContainer/>
      <Routes>
        <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
       <Route element={<Privateroutes/>}>       
                         {/*In private Route there is no "path" attribute*/}
             <Route path="/profile" element={<Profilepage/>}/>
             <Route path="/start-a-podcast" element={<Startapodcastpage/>}/>
             <Route path="/podcasts" element={<Podcastspage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

