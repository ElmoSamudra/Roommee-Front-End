import React, { useState, useEffect } from "react";
import { useMatch, runMatch } from "../api/matchApi";
import { useProfile, getProfile } from "../api/profileApi";

export default function ShowMatch() {
  const [loadingMatch, setLoading] = useState(true);
  const [userMatch, setUserMatch] = useState([]);
  const [errorMatch, setError] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setUserProfile(profile);
        setLoadingProfile(false);
      })
      .catch((e) => {
        console.log(e);
        setErrorProfile(e);
        setLoadingProfile(false);
      });
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

  //   const { loadingMatch, userMatch, errorMatch } = useMatch();
  //   const { loadingProfile, userProfile, errorProfile } = useProfile();

  if (loadingMatch || loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorMatch || errorProfile) {
    return <p>Something went wrong: {errorMatch.message}</p>;
  }

  // use this to make sure you are getting the right data
  console.log(userProfile);
  console.log(userMatch.data);

  // Display a list of the authors
  return (
    <div>
      <h1>Match Roommee</h1>
      <Match key={userProfile.data.accountId} {...userMatch.data} />
    </div>
  );
}

// matches here is an array of match users
function Match(matches) {
  console.log("check");
  console.log(matches);
  const allMatches = matches;

  //const [showUpdate, setShowUpdate] = useState(false);

  const [index, setIndex] = useState(0);

  // increment or decrement the match by 1
  function nextMatch() {
    setIndex(index + 1);
  }
  function prevMatch() {
    setIndex(index - 1);
  }

  return (
    <div className={`profile match user`} key={allMatches[index].accountId}>
      <form>
        <label>First name: {allMatches[index].firstName}</label>
        <br></br>
        <label>Surname: {allMatches[index].surName}</label>
        {index >= 0 && (
          <button className="btn-next" onClick={prevMatch}>
            Previous
          </button>
        )}
        {index <= allMatches.length && (
          <button className="btn-next" onClick={nextMatch}>
            Next
          </button>
        )}
      </form>
      {/* <Button className={"btn-update"} onClick={onSubmit}>
                  Update
              </Button> */}
    </div>
  );
}
