import React from 'react'
import "./fullpageloader-styles.css"
import logo from "../../images/logo1.png"

function Fullpageloader() {
  return (
    <div>
      <div className='loading'>
        <div className='logo'><img style={{borderRadius: "20px"}} src={logo} alt="pp"/></div>
        {/* <div style={{fontSize: "2rem"}}>Loading...</div> */}
        <div className='dots animate'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
      </div>
      </div>
  )
}

export default Fullpageloader
