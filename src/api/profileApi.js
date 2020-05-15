import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

function getProfile() {
  const endpoint = BASE_URL + `/user-profile`;
  const token = localStorage.token;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((res) => {
    return res.json();
  });
}

export function updateProfile(profile) {
  const {
    firstName,
    surName,
    age,
    gender,
    nationality,
    hobby,
    language,
    preferStay,
  } = profile;
  const endpoint = BASE_URL + "/user-profile/update";
  // return fetch query to update an author
  const token = localStorage.token;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      firstName,
      surName,
      age,
      gender,
      nationality,
      hobby,
      language,
      preferStay,
    }),
  }).then((res) => window.location.reload(window.location.reload));
}

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setUserProfile(profile);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loadingProfile: loading,
    userProfile,
    errorProfile: error,
  };
}
