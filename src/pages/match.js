import React, { useState, useEffect } from "react";
import { useMatch, likeUser } from "../api/matchApi";
import { useProfile } from "../api/profileApi";

export default function ShowMatch() {
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

// matches here is an array of match users
function Match(matches) {
  const allMatches = matches;
  const lenMatches = Object.keys(allMatches).length;
  //const [showUpdate, setShowUpdate] = useState(false);

  const [choice, setChoice] = useState([]);
  const [matchId, setMatchId] = useState([]);
  const [index, setIndex] = useState(0);

  // increment or decrement the match by 1
  function nextMatch() {
    setIndex(index + 1);
  }
  function prevMatch() {
    setIndex(index - 1);
  }

  function likedProfile() {
    // e.preventDefault();
    likeUser({
      id: matchId,
      ans: choice,
    });
  }

  return (
    <div className={`profile match user`} key={allMatches[index].accountId}>
      <form>
        <label>First name: {allMatches[index].firstName}</label>
        <br></br>
        <label>Surname: {allMatches[index].surName}</label>
        <br></br>
        <label>Age: {allMatches[index].age}</label>
        <br></br>
        <label>Gender: {allMatches[index].gender}</label>
        <br></br>
        <label>Nationality: {allMatches[index].nationality}</label>
        <br></br>
        <label>Hobby: {allMatches[index].hobby}</label>
        <br></br>
        <label>Language: {allMatches[index].language}</label>
        <br></br>
        <label>
          Looking for a place to stay in: {allMatches[index].preferStay}
        </label>
        <br></br>
        <input
          type="text"
          onChange={(event) => {
            setChoice(event.target.value);
            setMatchId(allMatches[index].accountId.toString());
          }}
        />
        <button type="button" onClick={likedProfile}>
          Submit
        </button>
        {/* <input
          type="text"
          name="firstName"
          placeholder="yes or no"
          onChange={(event) => {
            setChoice(event.target.value);
            setMatchId(allMatches[index].accountId.toString());
          }}
        /> */}

        {/* <button
          id="add-to-favorites"
          className="mdc-icon-button"
          aria-label="Add to favorites"
          aria-pressed="false"
        >
          <i className="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">
            pan_tool
          </i>
          <i className="material-icons mdc-icon-button__icon">pan_tool</i>

        </button> */}

        {index > 0 && (
          <button className="btn-next" onClick={prevMatch}>
            Previous
          </button>
        )}
        {index < lenMatches - 1 && (
          <button className="btn-next" onClick={nextMatch}>
            Next
          </button>
        )}
      </form>
    </div>
  );
}
