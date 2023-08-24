import React, { useState } from 'react'
import Input from '../Common-Components/Input/Input'
import Fileinput from '../Common-Components/Fileinput/Fileinput'
import Button from '../Common-Components/Button/Button'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'

const Createanepisodeform = () => {

    let {id} = useParams();//Destructuring "id" from the useParams object

  let [title,setTitle]=useState("");
  let [desc,setDesc]=useState("");
  let [podcastaudio,setPodcastaudio]=useState("");

  let [loading,setLoading] = useState(false);

  let navigate1 = useNavigate();

  //Banner Image selected - state update with file
  function audiofileupload(files) {
    setPodcastaudio(files);
  }

  async function handleCreateepisode() {

    if(title && desc && podcastaudio)
    {
      try {
       setLoading(true);
      const podcastaudioRef = ref(storage, `podcastaudiofiles/${auth.currentUser.uid}/${podcastaudio[0].name}${Date.now()})}`);
     await uploadBytes(podcastaudioRef, podcastaudio[0]).then((snapshot) => {
        console.log('Uploaded Audio File');
      });

      const podcastaudioUrl = await getDownloadURL(podcastaudioRef);
      const episodeData = {
        title:title,
        description:desc,
        audiofile:podcastaudioUrl,
      }

      toast.success("Files Uploaded successfully");

      const docRef = await addDoc(collection(db, "podcasts",id,"episodes"), {
        episodeData
      });
      
      toast.success("Episide Created");
      setLoading(false);
      setTitle("");
      setDesc("");
      setPodcastaudio("");
      navigate1(`/podcasts/${id}`);
    }
    catch(error) {
      console.log(error);
      toast.error("Some error occurred :",error.message);
      setLoading(false);
    }
    }
    else {
      if(!title || !desc)
      {
        toast.error("All the fields are required.")
      }
      else if(!podcastaudio)
      {
        toast.error("Please select audio file")
      }

    }
  }


  return (
    <>
        <Input type="text" placeholder="Title" state={title} setState={setTitle} required={true}/>
        <Input type="text" placeholder="Description" state={desc} setState={setDesc} required={true}/>
        <Fileinput text="Click To Upload Audio File" accept="audio/*" id="banner-img" filehandlingfunc={audiofileupload}/>
        <Button text={loading ? "Uploading Files...." :"Create Episode"} onClick={handleCreateepisode}/>
    </>
  )
}

export default Createanepisodeform
