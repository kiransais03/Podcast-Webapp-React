import React from 'react'
import {PiApplePodcastsLogoFill} from "react-icons/pi"

function Genretag ({text}) {
  return (
    <div style={{padding:"10px 10px",width:"fit-content",fontSize:"18px",color:"rgba(255, 255, 255, 0.5)"}}>
      <PiApplePodcastsLogoFill/>Genre:{text}
    </div>
  )
}

export default Genretag;