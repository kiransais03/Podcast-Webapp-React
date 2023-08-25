import React from "react";
import "../Login-page/loginpage-styles.css"
import "../../components/Common-Components/Header/Header"
import Loginform from "../../components/Signup-Login-Forms-Components/Loginform";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Loginpage =()=>{


    let navigate=useNavigate();

    async  function forgotpassword () {
        sendPasswordResetEmail(auth, )
    .then(() => {
      toast.success("done")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode,errorMessage);
      // ..
    });
      }

    return(<div>
        <div className="input-wrapper-form">
            <h1>Login</h1>
            <Loginform/>
            <p className="login-page-redirect" onClick={()=>{navigate("/signup")}}>Doesn't have an Account?Click here to <span>Signup.</span></p>
            <p className="login-page-redirect" onClick={()=>{navigate("/forgotpassword")}}>Forgot password?Click here to <span>Reset.</span></p>
        </div>
        </div>
    )
}

export default Loginpage;