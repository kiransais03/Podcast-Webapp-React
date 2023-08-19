// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7NV0AKLWf_GvuONflgd2ECull2LeikNI",
  authDomain: "podcast-react-app-5230f.firebaseapp.com",
  projectId: "podcast-react-app-5230f",
  storageBucket: "podcast-react-app-5230f.appspot.com",
  messagingSenderId: "1054574632394",
  appId: "1:1054574632394:web:e64528986673d5922a8333",
  measurementId: "G-VP6X2J3B0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {analytics,db,storage,auth};