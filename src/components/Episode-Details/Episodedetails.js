import React from 'react'
import Button from '../Common-Components/Button/Button';
import "./episodedetails-styles.css"

const Episodedetails = ({title,description,audiofile,onClick}) => {
  return (
    <div style={{width:"100%"}}>
      <h1 style={{textAlign:"left",marginBottom:"0",fontSize:"16px"}}>{title}</h1>
      <p style={{marginLeft:"1rem"}} className='episode-description'>{description}</p>
      <Button width={"200px"} text={"Play"} onClick={()=>{onClick(audiofile)}} />
    </div>
  )
}

export default Episodedetails
