import React,{useEffect, useState} from 'react'
import Fileinput from '../Common-Components/Fileinput/Fileinput';
import Input from '../Common-Components/Input/Input';
import ControllableStates from '../Common-Components/Autocomplete/ControllableStates';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Button from '../Common-Components/Button/Button';

let ct=0;

function Updateepisodedata({title,description,audiofile,episodeid,setDummystate,currentpodcast,index}) {

    //Edit Episode menu data states
    const [titleedit,setTitleedit]=useState("");
    const [descedit,setDescedit]=useState("");
    const [audiofileedit,setAudiofileedit]=useState("");

    const [loading,setLoading] = useState(false);
    console.log(titleedit,"this is the useState titile")

    useEffect(()=>{
        if (title && description) {
            setTitleedit(title);
            setDescedit(description);
        }
    },[title,description])
  

  async function handleEpisodeeditfunc() {
    if(titleedit && descedit) {
      try{
        const episodedetailsref = doc(db, "podcasts", currentpodcast.id,"episodes",episodeid); //"episode" is the collection name in firestore and userUid file name
    
        await updateDoc(episodedetailsref, {
          episodeData : {
             description:descedit,
             title:titleedit,
             audiofile:audiofile,
          }
        });
       
        toast.success("Episode data updated successfully")
        setDummystate("dummycallfor-re-render");
    
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


   //Audio File selected - state update with file
   function audiofileupload(files) {
      setAudiofileedit(files);
   }


//Audio upload
    async function handleAudiouploadfunc() {
        if(audiofileedit)
    {
      try {
       setLoading(true);
       const episodeaudioref = ref(storage, `podcastaudiofiles/${auth.currentUser.uid}/${audiofileedit[0].name}${Date.now()})}`);
     await uploadBytes(episodeaudioref, audiofileedit[0]).then((snapshot) => {
        console.log('Uploaded Audiofile');
      });

      const episodeaudioUrl = await getDownloadURL(episodeaudioref);
      console.log(episodeaudioUrl,"Audio url")

    //   toast.success("File Uploaded successfully");


    const episodeaudiodatasave = doc(db, "podcasts", currentpodcast.id,"episodes",episodeid); //"episode" is the collection name in firestore and userUid file name
    
    await updateDoc(episodeaudiodatasave, {
      episodeData : {
         description:descedit,
         title:titleedit,
         audiofile:episodeaudioUrl,
      }
    });
       console.log(episodeaudioUrl,"Again url")
      
      toast.success("Audio File Uploaded Successfully");
      setLoading(false);
      setAudiofileedit("");
      setDummystate("dummycallfor-re-render")
      
    }
    catch(error) {
      console.log(error);
      toast.error(`Some error occured ${error.message}`);
      setLoading(false);
    }
    }
    else {
      
       if(!audiofileedit)
      {
        toast.error("Please select audio file")
      }

    }
}


  return (

<div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id={`${episodeid}b`} data-bs-theme="dark" aria-labelledby={`${episodeid}b`}>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="staticBackdropLabel">Edit Podcast:{title} </h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <Input type={"text"} placeholder={"Title"} state={titleedit} setState={setTitleedit} /> <br/>
    <Input type={"text"} placeholder={"Description"} state={descedit} setState={setDescedit} />
    <div className="d-grid gap-2 col-6 mx-auto" style={{margin:"25px 0"}}>
         <button className="btn btn-primary" type="button" onClick={handleEpisodeeditfunc}>Update Data</button>
    </div>
    <Fileinput text="Click To Upload Audio File" accept="audio/*" id={index} filehandlingfunc={audiofileupload}/>
    <div className="d-grid gap-2 col-6 mx-auto" style={{margin:"25px 0"}}>
        <button  className="btn btn-primary" type="button" onClick={handleAudiouploadfunc}>{loading ?<div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>:"Update Audio File"}</button>
  </div>
  </div>
</div>
  )
}

export default Updateepisodedata;


