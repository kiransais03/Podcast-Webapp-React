
import './App.css';
import React,{useEffect} from 'react';
import {Routes,Route, Link} from "react-router-dom";
import Signuppage from './pages/Signup-page/Signuppage';
import Loginpage from './pages/Login-page/Loginpage';
import Header from './components/Common-Components/Header/Header';
import Profilepage from "./pages/Profile-page/Profilepage"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import {auth,db} from "./firebase"
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from "./slices/userSlices";
import { doc } from "firebase/firestore"; 
import Privateroutes from './components/Privateroutes';
import Startapodcastpage from './pages/StartAPodcast-page/Startapodcastpage';
import Podcastspage from './pages/Podcasts-page/Podcastspage';
import Podcastdetailspage from './pages/PocastDetails-page/Podcastdetailspage';
import Createanepisodepage from './pages/CreateAnEpisode-page/Createanepisodepage';
import Forgotpassword from './pages/Forgotpassword-page/Forgotpassword-page';
import Podcastsdisplay from './components/Podcasts-Display/Podcastsdisplay';
import Landingpage from './pages/Landingpage/Landingpage';
import logo from "./images/logo.png";
import Privaterouteslogin from './components/Privaterouteslogin';
import {useAuthState} from "react-firebase-hooks/auth"; 
import textimg from "./images/text.jpg"

function App() {

  let dispatch=useDispatch();
  let reduxdata=useSelector((state)=>{return state});
  console.log(reduxdata,"Redux Data");
  let [user,loading,error]=useAuthState(auth);

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
    <div style={{textAlign:"center"}}>
     {user? <Link to="/podcasts">
        <img style={{borderRadius:"10px",width:"3rem",marginTop:"5px"}} src={logo} alt='logo1'/>
      </Link>:<Link to="/">
        <img style={{borderRadius:"10px",width:"3rem",marginTop:"5px"}} src={logo} alt='logo1'/>
      </Link> }
      </div>
    <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='' element={<Landingpage/>}/>
        {/* <Route path="/signup" element={<Signuppage/>}/>
        <Route path="/login" element={<Loginpage/>}/> */}
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
       <Route element={<Privateroutes/>}>       
                         {/*In private Route there is no "path" attribute*/}
             <Route path="/profile" element={<Profilepage/>}/>
             <Route path="/start-a-podcast" element={<Startapodcastpage/>}/>

             <Route path="/podcasts" element={<Podcastspage/>}>
               <Route path='' element={<Podcastsdisplay/>}/>
               <Route path='crime' element={<Podcastsdisplay/>}/>
               <Route path='drama' element={<Podcastsdisplay/>}/>
               <Route path='history' element={<Podcastsdisplay/>}/>
               <Route path='news' element={<Podcastsdisplay/>}/>
               <Route path='politics' element={<Podcastsdisplay/>}/>
               <Route path='culture' element={<Podcastsdisplay/>}/>
               <Route path='lifestories' element={<Podcastsdisplay/>}/>
              </Route>
             <Route path="/podcasts/:id" element={<Podcastdetailspage/>}/>
             <Route path="/podcasts/:id/create-episode" element={<Createanepisodepage/>}/>
     
        </Route>
        <Route element={<Privaterouteslogin/>}>    
                  <Route path="/signup" element={<Signuppage/>}/>
                  <Route path="/login" element={<Loginpage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

