import React from "react";
import "../Signup-page/signuppage-styles.css"
import "../../components/Common-Components/Header/Header"
import Signupform from "../../components/Signup-Login-Forms-Components/Signupform";
import { useNavigate } from "react-router-dom";


const Signuppage = ()=>{

    let navigate=useNavigate();

    return(<div>
        
        <div className="input-wrapper-form">
            <h1>Signup</h1>
            <Signupform/>
            <p className="signup-page-redirect" onClick={()=>{navigate("/login")}}>Already have an Account?Click here to <span>LogIn.</span></p>
        </div>
        </div>
    )
}

export default Signuppage;

