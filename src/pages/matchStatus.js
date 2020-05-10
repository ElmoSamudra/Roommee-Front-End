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
          <DivStatus
            key={userPending.accountId}
            matchData={statusMatch.userMatchData}
            user={userPending}
          />
        ))}
      </div>
    </>
  );
}

function DivStatus({ matchData, user }) {
  const [choice, setChoice] = useState("yes");
  const userStatusMatch = matchData;

  useEffect(() => {
    likeUser({
      id: user.accountId,
      ans: choice,
    });
  }, [choice, user.accountId]);

  // alert submit button when roommee trying to remove someone on his/her match status
  function onRemove() {
    confirmAlert({
      title: "Remove Confirmation",
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

  // alert submit button when roommee trying to remove someone on his/her match status
  function onChat() {
    confirmAlert({
      title: "Chat Not Ready",
      message: "The chat functionality is not ready yet",
      buttons: [
        {
          label: "Ok",
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <div className="container-single-status">
      {choice === "yes" && (
        <div className="match-status">
          <p>Name: {user.firstName + " " + user.surName}</p>
          <p>Gender: {user.gender}</p>
          <p>Nationality: {user.nationality}</p>
          <p>Hobby: {user.hobby}</p>
          <p>Language: {user.language}</p>
          <p>Find a place to stay in: {user.preferStay}</p>

          {userStatusMatch.clickedMatch === user.accountId.toString() ? (
            <p className="current-match-status">This is your roommee</p>
          ) : userStatusMatch.chat.indexOf(user.accountId.toString()) !== 1 ? (
            <p className="current-match-status">Pending Invitation</p>
          ) : (
            <>
              <p className="current-match-status">Go and Say Hi!</p>
              <button className="chat-button" onClick={onChat}>
                Chat
              </button>
            </>
          )}
          {userStatusMatch.clickedMatch !== user.accountId.toString() && (
            <div className="status-buttons">
              <label>Ring Roommee?</label>
              <button
                className="change-status-button"
                onClick={() => {
                  setChoice("yes");
                }}
              >
                Yes
              </button>
              <button className="change-status-button" onClick={onRemove}>
                No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
