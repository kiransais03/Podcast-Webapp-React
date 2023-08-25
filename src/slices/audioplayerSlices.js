import { createSlice } from "@reduxjs/toolkit";


let initialState={
    episodesarr:[],
    playingFile:"",
    image:"",
    currentplayfileindex:"",
    setCurrentplayfileindex:"",
}

const audioplayerSlices = createSlice({
    name:"audioplayer-redux",
   initialState:initialState,
   reducers:{
    setEpisodesarr:(state,action)=>{
        state.episodesarr=action.payload;
    },
    setPlayingFile:(state,action)=>{
        state.playingFile=action.payload;
    },
    setImage:(state,action)=>{
        state.image=action.payload;
    },
    setCurrentplayfileindex:(state,action)=>{
        state.currentplayfileindex=action.payload;
    },
    setSetCurrentplayfileindex:(state,action)=>{
        state.setCurrentplayfileindex=action.payload;
    }
   }
})


export const {setEpisodesarr,setPlayingFile,setImage,setCurrentplayfileindex,setSetCurrentplayfileindex}=audioplayerSlices.actions;
export default audioplayerSlices.reducer;