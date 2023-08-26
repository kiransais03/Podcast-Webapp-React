import React, { useContext } from 'react'
import Podcastcard from '../Common-Components/PodcastCard/Podcastcard'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Searchcontext from '../../Context/Searchcontext';

function Podcastsdisplay() {
    let location=useLocation();
    let currentpath=location.pathname;
    let sortedPodcastsarr;
 
    let obj1 = useContext(Searchcontext);
    console.log(obj1,"contenxt object")
    const podcastsarr = useSelector((state)=>{return state.podcasts.podcastsarr});

    if(currentpath!=="/podcasts")
    {
        console.log("matched path serach",sortedPodcastsarr)
     sortedPodcastsarr = podcastsarr.filter((item)=>{console.log(item.genre);return (currentpath.includes(item.genre.toLowerCase()) )})  
     console.log("filtered path serach",sortedPodcastsarr)
    }
    else if(currentpath==="/podcasts")
    {
        sortedPodcastsarr = [...podcastsarr];
        console.log("all path serach",sortedPodcastsarr)
    }

    if(obj1.search)
    {
        // console.log("entered serach",sortedPodcastsarr[0].title.includes(obj1.search.trim().toLowerCase()))
        sortedPodcastsarr = sortedPodcastsarr.filter((item)=>{return (item.title.trim().toLowerCase().includes(obj1.search.trim().toLowerCase()) )})
    }
  return (
    <div>
       <div className="podcast-cards-div">
            {sortedPodcastsarr?.length>0 ? sortedPodcastsarr.map((item)=>{ return <Podcastcard key={item.id} id={item.id} title={item.title} displayimg={item.displayimg}/> })
             : <p>No Podcasts Found</p>}
            </div>
    </div>
  )
}

export default Podcastsdisplay;
