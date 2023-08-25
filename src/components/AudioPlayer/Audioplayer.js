import React, { useEffect, useRef, useState } from 'react'
import { FaPause,FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import {RxTrackPrevious,RxTrackNext} from 'react-icons/rx'
import "./audioplayer-styles.css";
import { toast } from 'react-toastify';

function Audioplayer  ({audioSrc,image,currentplayfileindex,setCurrentplayfileindex,episodesarr})  {

    const audioRef =useRef();
    const [isPlaying,setIsPlaying] = useState(false);
    const [isMute,setIsMute] = useState(false);
    const [duration,setDuration] = useState(0);
    const [volume,setVolume] = useState(0.5);
    const [currentTime,setCurrentTime]=useState(0);


   const  handleDuration =(e)=>{
      let currtimeval = (e.target.value/100)*duration
      setCurrentTime(currtimeval);
      console.log("Duration:",e.target.value)
      audioRef.current.currentTime=currtimeval;
   }


   const togglePlay = ()=>{
    if(!audioSrc)
    {
      toast.info("Please select any Episode to play.")
    }
    else {
    setIsPlaying(!isPlaying);
    }
   }



   const toggleMute = ()=>{
    setIsMute(!isMute);
   }

   const handleVolume = (e)=>{
    setVolume(e.target.value);
    audioRef.current.volume=e.target.value;
   }

   useEffect(()=>{
   const audio=audioRef.current;
   audio.addEventListener("loadedmetadata",handleLoadedmetadata);
   audio.addEventListener("timeupdate",handleTimeupdate);
   audio.addEventListener("ended",handleEnded);

   return ()=>{
    audio.removeEventListener("loadedmetadata",handleLoadedmetadata);
    audio.removeEventListener("timeupdate",handleTimeupdate);
    audio.removeEventListener("ended",handleEnded);
   }
   },[])

   //Format Time in minutes and seconds
   const formatTime = (time)=>{
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);

   return `${minutes}:${seconds}`
   }


   const handleTimeupdate = ()=>{  //To find the current Played time of the audio file in secs
    setCurrentTime(audioRef.current.currentTime);
   }

   const handleLoadedmetadata = ()=>{  //To find the total length of the audio file in secs
    setDuration(audioRef.current.duration);
    console.log("duration set",audioRef.current.duration)
   }

   const handleEnded = ()=>{  //To know and update the audio play has been completed and change the play icon
     setCurrentTime(0);
     setIsPlaying(false);
   }

useEffect(()=>{
  console.log(audioSrc,"Chrkc this oyut kfsadjfjsdaljfljsdaflkjlsajf");
  if(audioSrc) {
    if(isPlaying)
    {
      audioRef.current.pause();
      setCurrentTime(0);
      audioRef.current.play();
    }
    else {
     togglePlay();
    }
  }
},[audioSrc])


useEffect(()=>{
  if(isPlaying)
  {
    audioRef.current.play();
  }
  else {
   audioRef.current.pause();
  }
 },[isPlaying])


  useEffect(()=>{
   if(isMute)
   {
    audioRef.current.volume=0;
    setVolume(0);
   }
   else {
    audioRef.current.volume=1;
    setVolume(1);
   }
  },[isMute])

  useEffect(()=>{
   audioRef.current.volume=volume;
   setIsMute(volume===0);
  },[volume])

  const prevsong = ()=>{
    console.log(currentplayfileindex,"hi hello")
    if(currentplayfileindex!==0) {
    setCurrentplayfileindex(currentplayfileindex-1);
    }
  }

  const nextsong = ()=>{
    console.log(currentplayfileindex,"56 hello")
    if(currentplayfileindex>=episodesarr.length) {
    setCurrentplayfileindex(currentplayfileindex+1);
    }
  }

  return (
    <div className='custom-audio-player'>
      <div className='player-control-btns'>
        <img src={image} alt='thumbnail'className='display-image-plr'/>
        <audio ref={audioRef} src={audioSrc}/>      {/*By using "useRef" hook we are taking the reference of the element  */}
                                                {/* And by using this we easily access the element for our manipulations */}
        <p className='audio-btn' onClick={prevsong}><RxTrackPrevious/></p>                                        
        <p className='audio-btn' onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/>}</p>
        <p className='audio-btn' onClick={nextsong}><RxTrackNext/></p>
        </div>
        <div className='duration-flex'>
            <p>{formatTime(currentTime)}</p>
            <input type='range' min={0} max={100} value={(currentTime/duration)*100} onChange={handleDuration} className='duration-range'/>
            <p>-{formatTime(duration-currentTime)}</p>
            <p className='audio-btn' onClick={toggleMute}>{!isMute?<FaVolumeUp/> : <FaVolumeMute/> }</p>
            <input type='range' min={0} max={1} step={0.01} onChange={handleVolume} className='volume-range'/>
        </div>
    </div>
  )
}

export default Audioplayer;
