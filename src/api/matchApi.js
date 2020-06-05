import { useState, useEffect } from "react";

const BASE_URL = "https://roommee.herokuapp.com";
// const BASE_URL = "http://localhost:3000";

// get the matching profiles from backend
function runMatch() {
  const endpoint = BASE_URL + `/user-match`;
  const token = localStorage.token;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

// get the matching status from backend
function getMatchStatus() {
  const endpoint = BASE_URL + "/user-match/status";
  const token = localStorage.token;
  return fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

// update the liked match that the user has chosen to backend
export function likeUser(user) {
  console.log("update");
  const { id, ans } = user;
  const endpoint = BASE_URL + "/user-match/fill-status";
  const token = localStorage.token;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      ans,
    }),
  }).then((res) => {
    console.log(res);
  });
}

// create the use effect to get the matching profiles
export function useMatch() {
  const [loading, setLoading] = useState(true);
  const [userMatch, setUserMatch] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    runMatch()
      .then((matches) => {
        console.log(matches);
        setUserMatch(matches);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loadingMatch: loading,
    userMatch,
    errorMatch: error,
  };
}

// create the use effect to get all of the matching status
export function useStatusMatch() {
  const [loading, setLoading] = useState(true);
  const [statusMatch, setStatusMatch] = useState([]);
  const [error, setError] = useState(null);

  // get the match status
  useEffect(() => {
    try {
      getMatchStatus()
        .then((status) => {
          console.log(status);
          setStatusMatch(status);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    } catch {
      setStatusMatch([]);
      setLoading(false);
    }
  }, []);

  return {
    loadingStatus: loading,
    statusMatch,
    errorStatus: error,
  };
}
