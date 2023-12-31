import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams() hook from react-router-dom to get the url(here Id) what is currenytly opened.
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import {auth, db} from "../../firebase";
import { toast } from 'react-toastify';
import Button from "../../components/Common-Components/Button/Button";
import "./podcastdetailspage-styles.css"
import { useDispatch, useSelector } from 'react-redux';
import Episodedetails from '../../components/Episode-Details/Episodedetails';
import { setPodcasts } from '../../slices/podcastSlices';
import Audioplayer from '../../components/AudioPlayer/Audioplayer';
import Genretag from '../../components/Common-Components/Genretag/Genretag';
import Updatepodcastdata from '../../components/Updatepodcastdata/Updatepodcastdata';
import Updateepisodedata from '../../components/UpdateEpisodedata/Updateepisodedata';
import {setEpisodesarrredux,setPlayingFileredux,setCurrentplayfileindexredux, setImageredux, setsetNewindexInCurrentplayfileindex,setIspodcastdetailspageunmounted } from '../../slices/audioplayerSlices';

const Podcastdetailspage = () => {

  const {id} =useParams();  //Destructuring "id" from the useParams object
  const [currentpodcast,setCurrentpodcast] =useState("");
  let [episodesarr,setEpisodesarr] = useState([]);
  const [playingFile,setPlayingfile]=useState("");
  const [currentplayfileindex,setCurrentplayfileindex] = useState("");

  let newindexInCurrentplayfileindex = useSelector((state)=>{return state.audioplayerredux.setNewindexInCurrentplayfileindex;});

  const [dummystate,setDummystate]=useState("") //Dummy state just for rendering after updating the podcast data in another component

  let [createdBy,setCreatedBy] = useState("");

  
  let currpodData="";
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
// console.log(id,useParams());

useEffect(()=>{
  dispatch(setIspodcastdetailspageunmounted(false))

  return ()=>{
    dispatch(setIspodcastdetailspageunmounted(true));
  }
},[])

useEffect(()=>{
  if(newindexInCurrentplayfileindex!=="")
  {
    setCurrentplayfileindex(newindexInCurrentplayfileindex);
    dispatch(
      setsetNewindexInCurrentplayfileindex("")
      );
  }
},[newindexInCurrentplayfileindex,currentplayfileindex,playingFile])

  useEffect(()=>{
    if(id)
    {
      getData1();
    }
  },[id,dummystate])

  async function getData1 () {  // To get the selected podcast details we are getting from the Firebase using ID of the file .
    console.log("getdata1 called")
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
  toast.error(`Some error occured ${error.message}`);
}
}


useEffect(()=>{
  try {
  console.log("running1")
  const unsub = onSnapshot(doc(db, "podcasts",id,), (doc) => {
    setCurrentpodcast({id:id,...doc.data()});
    currpodData={id:id,...doc.data()};
  });
   console.log("Podcast updated successfully")

   return ()=>{
    unsub();  //Cleanup function to the realtime Firestore Db listener after the component unmounts.
}
  }

catch(error) {
  toast.error(`Some error occured ${error.message}`);
}
 
},[id])



useEffect(()=>{
  console.log("running2")
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
  toast.error(`Some error occured ${error.message}`);
});

  return ()=>{
  unsubscribe();  //Cleanup function to the realtime Firestore Db listener after the component unmounts.
}
},[id])


useEffect(()=>{
setPlayingfile(episodesarr[currentplayfileindex]?.audiofile)
},[currentplayfileindex])




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

function addAudioplayerdatatoRedux () {
  console.log(episodesarr,currentpodcast.displayimg,"testingt")
  
      dispatch(setEpisodesarrredux(episodesarr));
      dispatch(setPlayingFileredux(playingFile));
      dispatch(setImageredux(currentpodcast.displayimg));
      dispatch(setCurrentplayfileindexredux(currentplayfileindex));
      // dispatch(setsetNewindexInCurrentplayfileindex(setCurrentplayfileindex));
      console.log("done dispatch")
 console.log("audio redux dispatch ")
}
  
useEffect(()=>{
 if(playingFile)
    addAudioplayerdatatoRedux();
},[currentplayfileindex,playingFile])



  return (
    <div>
    <div className='input-wrapper'>
      {currentpodcast.id && (
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",width:"100%",margin:"1rem"}}>
            <h1 className='currentpodcast-page-titles' style={{wordBreak:"break-all"}}>{currentpodcast.title}</h1>
            
            {currentpodcast.createdBy===auth.currentUser.uid && (
              <>
                 <button style={{margin:"1rem"}} className="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1" aria-controls="staticBackdrop1">
                     Edit Podcast
                   </button>
              <Button
                text="Create Episode"
                onClick={() => {navigate(`/podcasts/${id}/create-episode`)}}
                style={{margin:"0",width:"400px !important"}}
              />
              </>
            )}
          <div id='createdbytag'>Created By {createdBy.name}({createdBy.email})</div>
          </div>
          <div style={{width:"100%"}}>
          <Genretag text={currentpodcast.genre}/>
          </div>
          <div className='current-podcast-bannerwrap'>
            <img src={currentpodcast.bannerimg} alt="banner"/>
          </div>
          <p className='currentpodcast-description' style={{wordBreak:"break-all"}}>{currentpodcast.description}</p>
  
          <h1 className='currentpodcast-page-titles'>Episodes </h1>
          {/* <button style={{width:"100%",maxWidth:"200px"}} className="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop2" aria-controls="staticBackdrop2 ">
                   Edit Episodes
          </button> */}
          {episodesarr.length > 0 ? (<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",margin:"1rem",marginTop:"0"}}>
            <ol>
              {episodesarr.map((episode,index) => (
               <li key={episode.id}> <Episodedetails
                  title={episode.title}
                  description={episode.description}
                  audiofile={episode.audiofile}
                  sendfile={(file)=>{ setPlayingfile(file); }}
                  index={index}
                  setCurrentplayfileindex={(index)=>{setCurrentplayfileindex(index)}}
                  setDummystate={setDummystate}
                  currentpodcast={currentpodcast}
                  episodeid={episode.id}
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
    {/* <Audioplayer episodesarr={episodesarr} audioSrc={playingFile} image={currentpodcast.displayimg} currentplayfileindex={currentplayfileindex} setCurrentplayfileindex={setCurrentplayfileindex}/> */}
 
 {/* //Offcanvas for Edit of Podcast */}
  
  <Updatepodcastdata currentpodcast={currentpodcast} getData1={getData1}/>
  
  </div>
  
  )
}

export default Podcastdetailspage;
