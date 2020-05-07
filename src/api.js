import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3000";

function getProfile() {
    const endpoint = BASE_URL + `/user-profile`;

  // TODO
  // return fetch call that gets author list
    return axios.get(endpoint).then((response)=>{
        console.log(response);
        return response;
    }).catch(function(error){
        console.log(error);
    })
//   return fetch(endpoint).then(res => {
//       console.log(res);
//       return res.json();
//   });
}

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile()
      .then(profile => {
        setUserProfile(profile);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    userProfile,
    error
  };
}
