import React from 'react'
import Createanepisodeform from '../../components/CreateAnEpisode-Form/Createanepisodeform';

const Createanepisodepage = () => {
  

  return (
    <div>
       <div className="input-wrapper">
            <h1>Create An Episode</h1>
            <Createanepisodeform/>
        </div>
        <div style={{height:"72px"}}></div>
    </div>
  )
}

export default Createanepisodepage;
