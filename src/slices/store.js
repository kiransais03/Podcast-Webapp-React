import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./userSlices";
import podcastReducer from "./podcastSlices";


export default configureStore({
    reducer:{
        userdata:userReducer,   //"userdata" this same name should be given in the uerSlices.js file, as name:"userdata" property
        podcasts:podcastReducer,   //This is the store name.
    },                          
})

