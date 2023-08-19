import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./userSlices"

export default configureStore({
    reducer:{
        userdata:userReducer,   //"userdata" this same name should be given in the uerSlices.js file, as name:"userdata" property
    },                          //This is the store name.
})

