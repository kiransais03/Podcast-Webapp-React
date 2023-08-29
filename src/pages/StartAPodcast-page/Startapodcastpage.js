import React from 'react'
import Createpodcastform from '../../components/Create-Podcast-Component/Createpodcastform'

const Startapodcastpage=() =>{
  return (
    <div>
      <div className="input-wrapper-form">
            <h1>Create A Podcast</h1>
          <Createpodcastform/>
        </div>
        <div style={{height:"72px"}}></div>
    </div>
  )
}

export default Startapodcastpage
