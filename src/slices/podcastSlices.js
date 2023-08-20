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


export const {setPodcasts} = podcastSlices.actions;
export default podcastSlices.reducer;
