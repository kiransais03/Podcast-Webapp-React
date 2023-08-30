import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    podcastsarr:[],
}


const podcastSlices = createSlice({
  name:"podcasts",
  initialState,
  reducers :{
    setPodcasts : (state,action)=>{
       state.podcastsarr=action.payload;
    }
  }
})
//adsfdsaf; 


export const {setPodcasts} = podcastSlices.actions;  //Destructuring the "setPodcasts" function from "podcastSlices.actions" object
export default podcastSlices.reducer;


//THis is the 