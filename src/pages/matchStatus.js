import React, { useState, useEffect } from "react";
import { useStatusMatch, likeUser } from "../api/matchApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ShowStatusMatch() {
  const { loading, statusMatch, error } = useStatusMatch();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  console.log(statusMatch.pendingStatus);
  // Display a list of the authors
  return (
    <>
      <div className="container-match-status">
        <h1>Match Status</h1>
        {statusMatch.pendingStatus.map((userPending) => (
          <DivStatus key={userPending.accountId} {...userPending} />
        ))}
      </div>
    </>
  );
}

function DivStatus(user) {
  const [choice, setChoice] = useState("yes");

  useEffect(() => {
    console.log(choice);
    likeUser({
      id: user.accountId,
      ans: choice,
    });
  }, [choice, user.accountId]);

  function onSubmit() {
    confirmAlert({
      title: "Confirm to submit",
      message:
        "The roommee will be removed from your status, but you can still find him/her in the match page. Please confirm your action",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setChoice("no");
          },
        },
        {
          label: "No",
          onClick: () => {
            setChoice("yes");
          },
        },
      ],
    });
  }

  return (
    <div className="container-single-status">
      {choice === "yes" && (
        <div className="match-status">
          <p>Name: {user.firstName + user.surName}</p>
          <p>Gender: {user.gender}</p>
          <p>Nationality: {user.nationality}</p>
          <p>Hobby: {user.hobby}</p>
          <p>Language: {user.language}</p>
          <p>Find a place to stay in: {user.preferStay}</p>
          <label>Ring Roommee?</label>
          <button
            className="change-status-button"
            onClick={() => {
              setChoice("yes");
            }}
          >
            Yes
          </button>
          <button className="change-status-button" onClick={onSubmit}>
            No
          </button>
        </div>
      )}
    </div>
  );
}
