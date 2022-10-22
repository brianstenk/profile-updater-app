
import './App.css';

import axios from 'axios'

import {React, useEffect, useState} from 'react';


const UserProfile = () => {

  const fetchUserProfiles = () => {
    const url = "http://localhost:8080/api/v1/userProfiles";
    
    axios.get(url).then(
      resp => console.log(resp)
    );
    
  }
  
  useEffect (
    () => {
      fetchUserProfiles();
    }, []
  );
  
}

function App() {

  return (
    <div className="App">
      <h1>List of UserProfile</h1>

      <UserProfile />

    </div>
  );
}



export default App;
