import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from "../Common-Components/Input/Input";
import Button from "../Common-Components/Button/Button";
import Fileinput from '../Common-Components/Fileinput/Fileinput';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref,uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import ControllableStates from '../Common-Components/Autocomplete/ControllableStates';

const Createpodcastform = () => {

  let [title,setTitle]=useState("");
  let [desc,setDesc]=useState("");
  let [bannerimg,setBannerimg]=useState("");
  let [displayimg,setDisplayimage] = useState("");
  let [genre,setGenre]=useState("")

  let [loading,setLoading] = useState(false);

    let navigate1 = useNavigate();

    //Banner Image selected - state update with file
    function bannerimgupload(files) {
       setBannerimg(files);
    }

    //Display Image selected - state update with file
    function displayimgupload(files) {
        setDisplayimage(files);
    }

  async function handleCreatepodcast() {

    if(title && desc && bannerimg && displayimg && genre)
    {
      try {
       setLoading(true);
      const bannerimgRef = ref(storage, `podcastimages/${auth.currentUser.uid}/${bannerimg[0].name}${Date.now()})}`);
     await uploadBytes(bannerimgRef, bannerimg[0]).then((snapshot) => {
        console.log('Uploaded Bannerimage');
      });

      const bannerimgUrl = await getDownloadURL(bannerimgRef);

      const displayimgRef = ref(storage, `podcastimages/${auth.currentUser.uid}/${displayimg[0].name}${Date.now()})}`);
      await uploadBytes(displayimgRef, displayimg[0]).then((snapshot) => {
        console.log('Uploaded Displayimage');
      });

      const displayimgUrl = await getDownloadURL(displayimgRef);
      toast.success("Files Uploaded successfully");

      const docRef = await addDoc(collection(db, "podcasts"), {
        title: title,
        description: desc,
        bannerimg:bannerimgUrl,
        displayimg:displayimgUrl,
        createdBy :auth.currentUser.uid,
        genre:genre,
      });
      
      toast.success("Podcast Created");
      setLoading(false);
      navigate1(`/podcasts/${docRef.id}`);
    }
    catch(error) {
      console.log(error);
      toast.error("Some error occurred :",error.message);
      setLoading(false);
    }
    }
    else {
      if(!title || !desc || !genre)
      {
        toast.error("All the fields are required.")
      }
      else if(!bannerimg || !displayimg)
      {
        toast.error("Please select both the images.")
      }

    }
  }

  return (
    <>
            <Input type="text" placeholder="Podcast Title" state={title} setState={setTitle} required={true}/>
            <div style={{display:"flex",alignItems:"center",width:"100%"}}>
            <Input type="text" placeholder="Podcast Description" state={desc} setState={setDesc} required={true}/>
            <ControllableStates setGenre={setGenre}/>
            </div>
            <Fileinput text="Click To Upload Banner Image" accept="image/*" id="banner-img" filehandlingfunc={bannerimgupload}/>
            <Fileinput text="Click To Upload Display Image" accept="image/*" id="display-img" filehandlingfunc={displayimgupload}/>
            <Button text={loading ? "Uploading Files...." :"Create Now"} onClick={handleCreatepodcast}/>
    </>
  )
}

export default Createpodcastform;
