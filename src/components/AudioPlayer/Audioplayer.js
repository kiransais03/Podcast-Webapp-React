import React, { useEffect, useRef, useState } from 'react'
import { FaPause,FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "./audioplayer-styles.css"

function Audioplayer  ({audioSrc,image})  {

    const audioRef =useRef();
    const [isPlaying,setIsPlaying] = useState(false);
    const [isMute,setIsMute] = useState(false);
    const [duration,setDuration] = useState(0);
    const [volume,setVolume] = useState(0.5);
    const [currentTime,setCurrentTime]=useState(0);

   const  handleDuration =(e)=>{
      setCurrentTime(e.target.value);
      audioRef.current.currentTime=e.target.value;
   }


   const togglePlay = ()=>{
    setIsPlaying(!isPlaying);
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
   audio.addEventListener("loadmetadata",handleLoadedmetadata);
   audio.addEventListener("timeupdate",handleTimeupdate);
   audio.addEventListener("ended",handleEnded);

   return ()=>{
    audio.removeEventListener("loadmetadata",handleLoadedmetadata);
    audio.removeEventListener("timeupdate",handleTimeupdate);
    audio.removeEventListener("ended",handleEnded);
   }
   },[])

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
   }

   const handleEnded = ()=>{  //To know and update the audio play has been completed and change the play icon
     setCurrentTime(0);
     setIsPlaying(false);
   }

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


  return (
    <div className='custom-audio-player'>
        <img src={image} alt='thumbnail'className='display-image-plr'/>
        <audio ref={audioRef} src={audioSrc}/>      {/*By using "useRef" hook we are taking the reference of the element  */}
                                                {/* And by using this we easily access the element for our manipulations */}
        <p className='audio-btn' onClick={togglePlay}>{isPlaying ? <FaPause/> : <FaPlay/>}</p>
        <div className='duration-flex'>
            <p>{formatTime(currentTime)}</p>
            <input type='range' value={currentTime} onChange={handleDuration} className='duration-range'/>
            <p>{formatTime(duration-currentTime)}</p>
            <p lassName='audio-btn' onClick={toggleMute}>{!isMute?<FaVolumeUp/> : <FaVolumeMute/> }</p>
            <input type='range' min={0} max={1} step={0.01} onChange={handleVolume} className='volume-range'/>
        </div>
      
    </div>
  )
}

export default Audioplayer
