import React, { useEffect,useState } from 'react'
import {onSnapshot } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import {setPodcasts} from "../../slices/podcastSlices"
import { toast } from 'react-toastify';
import {db} from "../../firebase"
import Podcastcard from "../../components/Common-Components/PodcastCard/Podcastcard";
import "./podcastpage-styles.css"
import Input from '../../components/Common-Components/Input/Input';

const Podcastspage = () => {

    const dispatch = useDispatch();
    const podcasts = useSelector((state)=>{return state.podcasts.podcastsarr});
    console.log(podcasts)
    let [search,setSearch] = useState("");

useEffect(()=>{
    console.log("running")
const unsubscribe = onSnapshot(query(collection(db, "podcasts")), (querySnapshot) => {   //If any updates in Firestore db in all total collection of files this function will be triggered
  const podcastsData = [];
  querySnapshot.forEach((doc) => {
    podcastsData.push({id:doc.id,...doc.data()});
  });

  dispatch(setPodcasts(podcastsData));
 console.log("Podcasts updated successfully")
},
(error)=>
{
    toast.error("Some error occurred:",error.message)
});

    return ()=>{
    unsubscribe();  //Cleanup function to the realtime Firestore Db listener after the component unmounts.
}
},[dispatch])
 
let filterPodcasts = podcasts.filter((item)=>{return (item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) )})

  return (
    <div>
      <div className="input-wrapper">
            <h1 id="discover-podcasts-h1">Discover Podcasts</h1>
            <Input type="search" placeholder="Search by title of podcast" state={search} setState={setSearch} required={false}/>
            <div className="podcast-cards-div">
            {filterPodcasts.length>0 ? filterPodcasts.map((item)=>{ return <Podcastcard key={item.id} id={item.id} title={item.title} displayimg={item.displayimg}/> })
             : <p>No Podcasts Found</p>}
            </div>
            
        </div>
    </div>
  )
}

export default Podcastspage
