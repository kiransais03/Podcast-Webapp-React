import React from "react";
import "../Login-page/loginpage-styles.css"
import "../../components/Common-Components/Header/Header"
import Loginform from "../../components/Signup-Login-Forms-Components/Loginform";
import { useNavigate } from "react-router-dom";

const Loginpage =()=>{


    let navigate=useNavigate();


    return(<div>
        <div className="input-wrapper">
            <h1>Login</h1>
            <Loginform/>
            <p className="login-page-redirect" onClick={()=>{navigate("/signup")}}>Doesn't have an Account?Click here to <span>Signup.</span></p>
        </div>
        </div>
    )
}

export default Loginpage;