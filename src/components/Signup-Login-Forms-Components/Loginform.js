import React,{useState} from "react";
import Input from "../../components/Common-Components/Input/Input";
import Button from "../Common-Components/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlices";
import {toast} from "react-toastify"


const Loginform =()=>{


    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");

    let [loading,setLoading]=useState(false);

    let navigate1= useNavigate();
    let dispatch = useDispatch();

   async function handleLogin() {
       if(email && password && email.includes('@')) {
           try {
            console.log("Logging in....")
            setLoading(true);
       const userCredential=await signInWithEmailAndPassword(
            auth,
            email,
             password);
             const user=userCredential.user;
            console.log(user);

            let userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            console.log(userData);

            dispatch(setUser({
                name:userData.name,
                email:user.email,
                uid : user.uid,
                number:user.number,
                profilepic:user.profilepic,
              }))
              setLoading(false);
              toast.success('Login Successful');

             navigate1("/profile")
              
            console.log("Login Successfull.")

        }
        catch(error){
            setLoading(false);
            toast.error("Please check Email Id and Password");
            setPassword("")
            console.log("Some Error Occured :",error.code,error.message)
        }
    }
    else {
        setLoading(false);
        if(!email || !password)
    {
        toast.error('All the fields are required!');
    }
    else if(!email.includes('@'))
    {
        toast.error("Please enter valid EmailId");
    }
        
    }
    }

    return(<>
            <Input type="text" placeholder="Email" state={email} setState={setEmail} required={true}/>
            <Input type="password" placeholder="Password" state={password} setState={setPassword} required={true}/>
            <Button text={loading ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>: "Login"} onClick={handleLogin}/>
        </>
    )
}

export default Loginform;