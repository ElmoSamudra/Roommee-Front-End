import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export function runMatch() {
  console.log("in api");
  const endpoint = BASE_URL + `/user-match`;
  return axios
    .get(endpoint)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function useMatch() {
  const [loading, setLoading] = useState(true);
  const [userMatch, setUserMatch] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("in");
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
    loading,
    userMatch,
    error,
  };
}
