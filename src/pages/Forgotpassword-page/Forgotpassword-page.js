import React, { useState } from "react";
import "../Login-page/loginpage-styles.css"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Input from "../../components/Common-Components/Input/Input";
import Button from "../../components/Common-Components/Button/Button";

const Forgotpassword =()=>{

    const [emailid,setEmailid] = useState("");

    let [sent,setSent]=useState(false);

    async  function forgotpassword () {
        sendPasswordResetEmail(auth,emailid )
    .then(() => {
      toast.success("Email with reset password link id sent.Please Check");
      setSent(true);
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
            <h1>Forgot Password</h1>
            <label htmlFor="emailid">Please Enter Your Email Id</label>
            <Input type={"text"} placeholder={"EmailId"} state={emailid} setState={setEmailid}/>
            <Button onClick={forgotpassword} text={"Reset Password"}/>
            <p style={sent?{display:"block"}:{display:"none"}}>Password reset link has been sent to your registered EmailId.Please click the link and reset your password.</p>
        </div>
        </div>
    )
}

export default Forgotpassword;