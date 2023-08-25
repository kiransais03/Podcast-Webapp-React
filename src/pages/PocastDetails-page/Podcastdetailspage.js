import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams() hook from react-router-dom to get the url(here Id) what is currenytly opened.
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import {auth, db} from "../../firebase";
import { toast } from 'react-toastify';
import Button from "../../components/Common-Components/Button/Button";
import "./podcastdetailspage-styles.css"
import { useDispatch } from 'react-redux';
import Episodedetails from '../../components/Episode-Details/Episodedetails';
import { setPodcasts } from '../../slices/podcastSlices';
import Audioplayer from '../../components/AudioPlayer/Audioplayer';

const Podcastdetailspage = () => {

  const {id} =useParams();  //Destructuring "id" from the useParams object
  const [currentpodcast,setCurrentpodcast] =useState("");
  let [episodesarr,setEpisodesarr] = useState([]);
  const [playingFile,setPlayingfile]=useState("");
  const [currentplayfileindex,setCurrentplayfileindex] = useState("");

  let [createdBy,setCreatedBy] = useState("");
  
  let currpodData="";
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
// console.log(id,useParams());


  useEffect(()=>{
    if(id)
    {
      getData1();
    }
  },[id])

  async function getData1 () {  // To get the selected podcast details we are getting from the Firebase using ID of the file .
    try {
      console.log("object")
  const docSnap = await getDoc(doc(db, "podcasts", id));
  if(docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    setCurrentpodcast({id:id,...docSnap.data()});
    currpodData={id:id,...docSnap.data()};
    getPodcastuserdetails();
   } else {
  // docSnap.data() will be undefined in this case
    toast.error("No such podcast found");
    navigate("/podcasts");
    console.log("No such document!");
  }
}
catch(error) {
  console.log("Some error occurred:",error);
  toast.error("Some error occurred:",error.message)
}
}



useEffect(()=>{
  console.log("running")
const unsubscribe = onSnapshot(query(collection(db, "podcasts",id,"episodes")), (querySnapshot) => {   //If any updates in Firestore db in episodes collection of files this function will be triggered
const podcastEpisodeData = [];
querySnapshot.forEach((doc) => {
  podcastEpisodeData.push({id:doc.id,...doc.data().episodeData});
});

dispatch(setPodcasts(podcastEpisodeData));
setEpisodesarr(podcastEpisodeData)
console.log("Episodes updated successfully")
},
(error)=>
{
  toast.error("Some error occurred:",error.message)
});

  return ()=>{
  unsubscribe();  //Cleanup function to the realtime Firestore Db listener after the component unmounts.
}
},[id])


useEffect(()=>{
setPlayingfile(episodesarr[currentplayfileindex]?.audiofile)
},[currentplayfileindex])


// useEffect(()=>{
//   getPodcastuserdetails();
// },[])

async function getPodcastuserdetails () {
  console.log(currpodData,"Podcast data")
   const docRef = doc(db, "users", currpodData?.createdBy);
   const docSnap = await getDoc(docRef);
   
   if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());;
     setCreatedBy(docSnap.data())
   } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
   }
   }


// console.log(currentpodcast,"current thing")

  return (
    <div>
    <div className='input-wrapper'>
      {currentpodcast.id && (
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",margin:"1rem"}}>
            <h1 className='currentpodcast-page-titles'>{currentpodcast.title}</h1>

            {currentpodcast.createdBy===auth.currentUser.uid && (
              <Button
                text="Create Episode"
                onClick={() => {navigate(`/podcasts/${id}/create-episode`)}}
                style={{margin:"0",width:"400px !important"}}
              />
            )}
          <div id='createdbytag'>Created By {createdBy.name}({createdBy.email})</div>
          </div>
          <div className='current-podcast-bannerwrap'>
            <img src={currentpodcast.bannerimg} alt="banner"/>
          </div>
          <p className='currentpodcast-description'>{currentpodcast.description}</p>
  
          <h1 className='currentpodcast-page-titles'>Episodes </h1>
          {episodesarr.length > 0 ? (<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",margin:"1rem",marginTop:"0"}}>
            <ol>
              {episodesarr.map((episode,index) => (
               <li key={episode.id}> <Episodedetails
                  title={episode.title}
                  description={episode.description}
                  audiofile={episode.audiofile}
                  sendfile={(file)=>{ setPlayingfile(file); }}
                  index={index}
                  setCurrentplayfileindex={setCurrentplayfileindex}
                /></li>
              ))}
            </ol></div>
          ) : (
            <>{"No Episodes"}</>
          )}
        </>
      )}
    </div>
    <div style={{height:"72px"}}></div>
    <Audioplayer episodesarr={episodesarr} audioSrc={playingFile} image={currentpodcast.displayimg} currentplayfileindex={currentplayfileindex} setCurrentplayfileindex={setCurrentplayfileindex}/>
  </div>
  
  )
}

export default Podcastdetailspage;
