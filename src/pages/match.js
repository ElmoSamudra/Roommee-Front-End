import React, { useState } from "react";
import { useMatch, likeUser } from "../api/matchApi";
import { useProfile } from "../api/profileApi";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { ToggleButton } from "@material-ui/lab";
import "react-toastify/dist/ReactToastify.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export default function ShowMatch() {
  const { loadingMatch, userMatch, errorMatch } = useMatch();
  const { loadingProfile, userProfile, errorProfile } = useProfile();

  if (loadingMatch || loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorMatch || errorProfile) {
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

  const [index, setIndex] = useState(0);

  // increment or decrement the match by 1
  function nextMatch() {
    setIndex(index + 1);
  }
  function prevMatch() {
    setIndex(index - 1);
  }

  // choice is the yes or no button
  async function likedProfileChoice(choice) {
    await likeUser({
      id: allMatches[index].accountId,
      ans: choice,
    });
    toast.info("Nice!, check them in your match status page!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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

        <Button type="button" onClick={() => likedProfileChoice("yes")}>
          Yes
        </Button>
        <Button type="button" onClick={() => likedProfileChoice("no")}>
          No
        </Button>

        {index > 0 && (
          <Button className="btn-next" onClick={prevMatch}>
            Previous
          </Button>
        )}
        {index < lenMatches - 1 && (
          // <Button className="btn-next" onClick={nextMatch}>
          //   Next
          // </Button>
          <ToggleButton value="check" onClick={nextMatch}>
            <ArrowForwardIcon />
          </ToggleButton>
        )}
      </form>
    </div>
  );
}
