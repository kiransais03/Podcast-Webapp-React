import React from 'react'
import img1 from "../../images/z42trjol.png"
import "./landingpage-styles.css"
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function Landingpage() {
  let [user,loading,error]=useAuthState(auth);

  let navigate = useNavigate();
  if(user)
  {
    navigate("/podcasts")
  }

  return (
    <div className="landdiv">
      <div className='img-div'>
         <img src={img1} alt="img12"/>
      </div>   
      <div className="App-header">
            <h1>Welcome to the Podcast App</h1>
            <p>Your source for amazing content</p>
           <div className='buttons'>
             <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg" onClick={()=>{navigate("/signup")}}>Sign Up</button> <br/>
             <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg"  onClick={()=>{navigate("/login")}}>Login</button>
           </div>
       </div>
    </div>
  );
}


export default Landingpage;
