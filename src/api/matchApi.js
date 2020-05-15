import { useState, useEffect } from "react";
//mport axios from "axios";

const BASE_URL = "http://localhost:3000";

function runMatch() {
  const endpoint = BASE_URL + `/user-match`;
  return fetch(endpoint).then((res) => {
    console.log(res);
    return res.json();
  });
}

function getMatchStatus() {
  const endpoint = BASE_URL + "/user-match/status";
  return fetch(endpoint).then((res) => {
    console.log(res);
    return res.json();
  });
}

export function likeUser(user) {
  const { id, ans } = user;
  const endpoint = BASE_URL + "/user-match/fill-status";

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ans,
    }),
  }).then((res) => {
    console.log(res);
  });
}

export function useMatch() {
  const [loading, setLoading] = useState(true);
  const [userMatch, setUserMatch] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    runMatch()
      .then((matches) => {
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

export function useStatusMatch() {
  const [loading, setLoading] = useState(true);
  const [statusMatch, setStatusMatch] = useState([]);
  const [error, setError] = useState(null);

  // get the match status
  useEffect(() => {
    getMatchStatus()
      .then((status) => {
        setStatusMatch(status);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loadingStatus: loading,
    statusMatch,
    errorStatus: error,
  };
}
