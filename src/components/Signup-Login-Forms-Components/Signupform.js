import React,{useState} from "react";
import Input from "../../components/Common-Components/Input/Input";
import Button from "../Common-Components/Button/Button";
//Firebase Auththentication
import {createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {db,auth,storage} from "../../firebase";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { setUser } from "../../slices/userSlices";
import {toast} from "react-toastify";
import Fileinput from "../Common-Components/Fileinput/Fileinput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Signupform =()=>{

    let [fname,setFname]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [confirmpassword,setConfirmpassword]=useState("");
    let [profilepic,setProfilepic] = useState("");

    let [loading,setLoading] = useState(false);

    let dispatch=useDispatch();
    let navigate1 = useNavigate();

    async function handleSingup() {
        if(fname && email && password && confirmpassword && email.includes('@') && password===confirmpassword && password.length>=6 && profilepic) {
            try {
            console.log("Signup in progress....");

            setLoading(true);
            //Creating account in Firebase/Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password);
            const user=userCredential.user;
            console.log(user);
          
            //Upload the image to the Storage and get the link
            const profilepicref = ref(storage, `userprofilepics/${auth.currentUser.uid}/${profilepic[0].name}${Date.now()})}`);

           uploadBytes(profilepicref, profilepic).then((snapshot) => {
             console.log('Uploaded profile picture');
            });

            const profilepicUrl = await getDownloadURL(profilepicref);


           //Add the account details to Firestore 
            await setDoc(doc(db, "users", user.uid), {  //"users" is the database name in Firestore
                name: fname,
                email:user.email,
                uid:user.uid,
                profilepic : profilepicUrl,
                number:""
              });
 
               //Saving the data in redux store or we can also say as Calling the reducer 
              dispatch(setUser({
                name:fname,
                email:user.email,
                uid : user.uid,
                profilepic : profilepicUrl,
                number:""
              }))
              setLoading(false);
              toast.success('Signup Successful');

             navigate1("/profile");
              
            console.log("Signup Successfull.")
    }
    catch(error){
        setLoading(false);
        toast.error('Account with this Email Already Exist.Please Login.');
         console.log("Some Error Occured :",error.code,error.message)
    }
}
else {
    setLoading(false);
    if(!fname || !email || !password || !confirmpassword || !profilepic)
    {
        toast.error('All the fields are required!');
    }
    else if(!email.includes('@'))
    {
        toast.error("Please enter valid EmailId");
    }
    else if(password!==confirmpassword)
    {
        setPassword("");
        setConfirmpassword("");
       toast.error('Please make sure Password and Confirm Password are same');
    }
    else if(password.length<6)
    {
    toast.error('Password should have minimum of 6 characters');
    }
   
}
}

    //Profile Picture selected - state update with file
    function profilepicupload(files) {
        setProfilepic(files);
     }

// const handleGoogleSignIn = async () => {
//     try {
//         var provider = new firebase.auth.GoogleAuthProvider();
//       await signInWithPopup(provider);
//       // User has successfully signed in with Google.
//     } catch (error) {
//       console.error("Error signing in with Google:", error.message);
//     }
//   };

    return(<>
            <Input type="text" placeholder="Full Name" state={fname} setState={setFname} required={true}/>
            <Input type="text" placeholder="Email" state={email} setState={setEmail} required={true}/>
            <Input type="password" placeholder="Password" state={password} setState={setPassword} required={true}/>
            <Input type="password" placeholder="Confirm Password" state={confirmpassword} setState={setConfirmpassword} required={true}/>
            <Fileinput text="Click here to Upload Profile Picture" accept="image/*" id="profilepic" filehandlingfunc={profilepicupload}/>
            <Button text={loading ? <div><div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow spinner-grow-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div> :"Signup"} onClick={handleSingup}/>
            {/* <button onClick={handleGoogleSignIn}>Sign in with Google</button> */}
        </>
    )
}

export default Signupform;