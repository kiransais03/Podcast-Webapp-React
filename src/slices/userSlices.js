import { createSlice } from "@reduxjs/toolkit";

const initialState ={user1:null,}

const userSlices =createSlice({
  name:"userdata",  //"userdata" name of the store.So to get the data from it,use state.user.This same name to be given in store.js file in the reducer object
  initialState,
  reducers:{ //In reducers these are direct functions to update the state.                             
       setUser:(state,action)=>{        //You just need to pass the data into fucntio directly by calling.
        state.user1=action.payload;
    },
    clearUser:(state)=>{
        state.user1=null;
    }
  }
})

export const {setUser,clearUser} =userSlices.actions;  //Destructuring the "setUser,clearUser" function from "userSlices.actions" object
export default userSlices.reducer;
