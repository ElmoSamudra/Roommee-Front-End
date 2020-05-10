import React, { useState, useEffect } from "react";
import { getMatchStatus, likeUser } from "../api/matchApi";

export default function ShowStatusMatch() {
  const [loading, setLoading] = useState(true);
  const [userStatusMatch, setUserStatusMatch] = useState([]);
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

  const { loadingMatch, userMatch, errorMatch } = useMatch();
  const { loading, userProfile, error } = useProfile();

  if (loadingMatch || loading) {
    return <p>Loading...</p>;
  }
  if (errorMatch || error) {
    return <p>Something went wrong: {errorMatch.message}</p>;
  }

  // use this to make sure you are getting the right data
  console.log(userMatch);

  // Display a list of the authors
  return (
    <div>
      <h1>Match Roommee</h1>
      <Match key={userProfile.accountId} {...userMatch} />
    </div>
  );
}
