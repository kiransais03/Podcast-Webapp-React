import { createSlice } from "@reduxjs/toolkit";


let initialState={
    episodesarr:[],
    playingFile:"",
    image:"",
    currentplayfileindex:"",
    setNewindexInCurrentplayfileindex:"",
    ispodcastdetailspageunmounted:true,
}

const audioplayerSlices = createSlice({
    name:"audioplayerredux",
   initialState:initialState,
   reducers:{
    setEpisodesarrredux:(state,action)=>{
        state.episodesarr=action.payload;
    },
    setPlayingFileredux:(state,action)=>{
        state.playingFile=action.payload;
    },
    setImageredux:(state,action)=>{
        state.image=action.payload;
    },
    setCurrentplayfileindexredux:(state,action)=>{
        state.currentplayfileindex=action.payload;
    },
    setsetNewindexInCurrentplayfileindex:(state,action)=>{
        state.setNewindexInCurrentplayfileindex=action.payload;
    },
   }
})


export const {setEpisodesarrredux,setPlayingFileredux,setImageredux,setCurrentplayfileindexredux,setsetNewindexInCurrentplayfileindex}=audioplayerSlices.actions;
export default audioplayerSlices.reducer;