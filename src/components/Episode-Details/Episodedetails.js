import React from 'react'
import Button from '../Common-Components/Button/Button';
import "./episodedetails-styles.css"
import Updateepisodedata from '../UpdateEpisodedata/Updateepisodedata';

const Episodedetails = ({title,description,audiofile,sendfile,index,setCurrentplayfileindex,currentpodcast,setDummystate,episodeid}) => {
 
const clickfunction = ()=>{
  sendfile(audiofile);
  console.log("Episodes array",index)
  setCurrentplayfileindex(index);
}
  return (
    <div style={{width:"100%"}}>
      <h1 style={{textAlign:"left",marginBottom:"0",fontSize:"16px"}}>{title}</h1>
      <p style={{marginLeft:"1rem"}} className='episode-description'>{description}</p>
      <Button text={"Play"} width={"150px"} onClick={clickfunction} />
      <button style={{width:"100%",maxWidth:"150px",marginLeft:"15px"}} className="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" data-bs-target={`#${episodeid}b`} aria-controls={`${episodeid}b`}>
                   Edit Episode
          </button>
      <Updateepisodedata index={index} title={title} episodeid={episodeid} description={description} audiofile={audiofile} currentpodcast={currentpodcast} setDummystate={setDummystate}/>
    </div>
  )
}

export default Episodedetails
