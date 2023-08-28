import React,{useEffect, useState} from 'react'
import Fileinput from '../Common-Components/Fileinput/Fileinput';
import Input from '../Common-Components/Input/Input';
import ControllableStates from '../Common-Components/Autocomplete/ControllableStates';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function Updatepodcastdata({currentpodcast,setDummystate}) {
    //Edit Podcast Data Functions

    //EditPodcast menu data states
    console.log(currentpodcast,"from update podcast")
    const [titleedit,setTitleedit]=useState("");
    const [descedit,setDescedit]=useState("");
    const [genreedit,setGenreedit]=useState("");
    const [banneredit,setBanneredit]=useState("");
    const [displayedit,setDisplayedit]=useState("");

    const [loading,setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false);
    console.log(titleedit,"this is the useState titile")

    useEffect(()=>{
        if (currentpodcast) {
            setTitleedit(currentpodcast.title);
            setDescedit(currentpodcast.description);
            setGenreedit(currentpodcast.genre);
        }
    },[currentpodcast])
  

  async function handlePodcastedit() {
    if(titleedit && descedit && genreedit) {
      try{
        const podcastdetailsref = doc(db, "podcasts", currentpodcast.id); //"users" is the db name in firestore and userUid file name
    
        await updateDoc(podcastdetailsref, {
          description:descedit,
          genre:genreedit,
          title:titleedit,
        });
       
        toast.success("Podcast data updated successfully")
        setDummystate("dummycallfor-re-render");
        // print
    
      }
      catch(error) {
        toast.error(`Some error occured ${error.message}`);
        console.log(error.message);
      }
    }
    else {
        toast.error("All the fields are required")
    }
    }

    function bannerimguploadeditfunc(files) {
      setBanneredit(files);
   }

   //Display Image selected - state update with file
   function displayimguploadeditfunc(files) {
      setDisplayedit(files);
   }


//Banner image upload
    async function handlebannerimgupdate() {
        if( banneredit)
    {
      try {
       setLoading(true);
      const bannerimgRef = ref(storage, `podcastimages/${auth.currentUser.uid}/${banneredit[0].name}${Date.now()})}`);
     await uploadBytes(bannerimgRef, banneredit[0]).then((snapshot) => {
        console.log('Uploaded Bannerimage');
      });

      const bannerimgUrl = await getDownloadURL(bannerimgRef);

    //   toast.success("File Uploaded successfully");


      const podcastdetailsref = doc(db, "podcasts", currentpodcast.id); //"users" is the db name in firestore and userUid file name
    
        await updateDoc(podcastdetailsref, {
            bannerimg:bannerimgUrl,
        });
       
      
      toast.success("Display Image Uploaded Successfully");
      setLoading(false);
      setDummystate("dummycallfor-re-render")
      
    }
    catch(error) {
      console.log(error);
      toast.error(`Some error occured ${error.message}`);
      setBanneredit("")
      setLoading(false);
    }
    }
    else {
      
       if(!banneredit)
      {
        toast.error("Please select image")
      }

    }
}

//Display image upload
    async function handledisplayimgupdate() {
  
        if(displayedit)
        {
          try {
           setLoading2(true);
    
          const displayimgRef = ref(storage, `podcastimages/${auth.currentUser.uid}/${displayedit[0].name}${Date.now()})}`);
          await uploadBytes(displayimgRef, displayedit[0]).then((snapshot) => {
            console.log('Uploaded Display image');
          });
    
          const displayimgUrl = await getDownloadURL(displayimgRef);
    
    
          const podcastdetailsref = doc(db, "podcasts", currentpodcast.id); //"users" is the db name in firestore and userUid file name
        
            await updateDoc(podcastdetailsref, {
                displayimg:displayimgUrl,
            });
           
          
          toast.success("Display Image Uploaded Successfully");
          setLoading2(false);
          setDisplayedit("")
          setDummystate("dummycallfor-re-render");
          
        }
        catch(error) {
          console.log(error);
          toast.error(`Some error occured ${error.message}`);
          setLoading2(false);
        }
        }
        else {
          
           if(!displayedit)
          {
            toast.error("Please select image")
          }
    
        }

    }

  return (

<div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop1" data-bs-theme="dark" aria-labelledby="staticBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="staticBackdropLabel">Edit Podcast:{currentpodcast.title}</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <div style={{marginLeft:"15px"}}>Title</div>
    <Input type={"text"} placeholder={"Title"} state={titleedit} setState={setTitleedit} /> <br/>
    <div style={{marginLeft:"15px"}}>Description</div>
    <Input type={"text"} placeholder={"Description"} state={descedit} setState={setDescedit} />
     <div style={{marginLeft:"15px"}}>Genre - {genreedit}</div>
     <ControllableStates setGenre={setGenreedit}/>
    <div className="d-grid gap-2 col-6 mx-auto" style={{margin:"25px 0"}}>
         <button className="btn btn-primary" type="button" onClick={handlePodcastedit}>Update Data</button>
    </div>
    <Fileinput text="Click To Select New Banner Image" accept="image/*" id="banner-img" filehandlingfunc={bannerimguploadeditfunc}/>
   
    <button className='profilebtns btn btn-primary' onClick={handlebannerimgupdate}>
      {loading ?<div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>:"Update Banner Image"}</button>


    <Fileinput text="Click To Select New Display Image" accept="image/*" id="display-img" filehandlingfunc={displayimguploadeditfunc}/>
    <button className='profilebtns btn btn-primary' onClick={handledisplayimgupdate}>
      {loading2 ?<div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>:"Update Display Image"}</button>

  </div>
</div>
  )
}

export default Updatepodcastdata
