
import './App.css';

import axios from 'axios'

import {React, useEffect, useState, useCallback} from 'react';

import {useDropzone} from 'react-dropzone';


const UserProfile = () => {

  const[userProfiles, setUserProfiles] = useState([]);

  useEffect (
     () => {

      const fetchUserProfiles = () => {

        const url = "http://localhost:8080/api/v1/userProfiles";
        
        axios.get(url).then(
          resp => {
            console.log(resp.data)
            const data = resp.data;
            setUserProfiles(data);
    
          }
        ).catch(
          err => console.log(err)
        );
        
      };

      fetchUserProfiles();
    }, []
  );

  function MyDropzone({profileId}) {

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      const file = acceptedFiles[0];

      console.log(file);

      const formData = new FormData();
      formData.append("file", file);

      console.log("The prof Id ", profileId)

      axios.post(`http://localhost:8080/api/v1/userProfiles/${profileId}/image/upload`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => console.log("file uploaded successfully"))
      .catch(err => console.log(err));

    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the image here ...</p> :
            <p>Drag 'n' drop some image here, or click to select image</p>
        }
      </div>
    )
  }

  return userProfiles.map((userProfile, index) => {
    return <div key = {index}>
        <br/>
         <h2>{userProfile.username}</h2>
         <p>{userProfile.profileId}</p>
         <MyDropzone {...userProfile}/>
         {/* <MyDropzone userProfileId = {userProfile.profileId}/> */}
         <br/>
    </div>
 
  })
  
}

function App() {

  return (
    <div className="App">
      <h1>List of UserProfile</h1>

      {/* map the state into what we we want */}

      <UserProfile />

    </div>
  );
}



export default App;
