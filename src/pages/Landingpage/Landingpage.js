import React from 'react'
import img1 from "../../images/z42trjol.png"
import "./landingpage-styles.css"
import { useNavigate } from 'react-router-dom';

function Landingpage() {

  let navigate = useNavigate();

  return (
    <div className="landdiv">
         <div className="App-header">
        <h1>Welcome to the Podcast App</h1>
        <p>Your source for amazing content</p>
        <div className='buttons'>
        <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg" onClick={()=>{navigate("/signup")}}>Sign Up</button> <br/>
        <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg"  onClick={()=>{navigate("/login")}}>Login</button>
      </div>
      </div>

      <div>
      <img style={{position:"relative"}} src={img1} alt="img12"/>
      </div>
        {/* <Carousal/> */}
       
    </div>
  );
}


export default Landingpage;
