import React from 'react'
import Button from '../Common-Components/Button/Button';
import "./episodedetails-styles.css"

const Episodedetails = ({title,description,audiofile,sendfile,index,setCurrentplayfileindex}) => {
 
const clickfunction = ()=>{
  sendfile(audiofile);
  console.log("Episodes array",index)
  setCurrentplayfileindex(index);
}
  return (
    <div style={{width:"100%"}}>
      <h1 style={{textAlign:"left",marginBottom:"0",fontSize:"16px"}}>{title}</h1>
      <p style={{marginLeft:"1rem"}} className='episode-description'>{description}</p>
      <Button text={"Play"} onClick={clickfunction} />
    </div>
  )
}

export default Episodedetails
