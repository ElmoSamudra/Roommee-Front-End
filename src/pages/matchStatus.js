import React, { useState, useEffect } from "react";
import { useStatusMatch, likeUser } from "../api/matchApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, TextField, Button, Box } from "@material-ui/core";
import { borders } from "@material-ui/system";

const friends1Pic = "../../images/friends1.jpg";
const roomPic = "../../images/room.jpg";

const useStyles = makeStyles((theme) => ({
  h1: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "-1%",
    fontSize: "70px",
    fontFamily: "Arial",
  },
  h2: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "-4%",
    fontSize: "30px",
    fontFamily: "Arial",
  },
  line: {
    marginLeft: "8.5%",
    marginRight: "8.5%",
    marginBottom: "3%",
    color: "#524a41f6",
  },
  sidePartRight: {
    backgroundColor: "#ffe0b2",
  },
  sidePartLeft: {
    backgroundColor: "#FCDB87",
  },
  details: {
    paddingRight: "17%",
    paddingLeft: "17%",
  },
  boxDetails: {
    marginRight: "20%",
    marginLeft: "20%",
    // color: "#efebe9"
    borderColor: "#d7ccc8",
  },
  currentMatchStatus: {
    paddingLeft: "30.5%",
    // fontSize: "15px",
  },
  ring: {
    paddingLeft: "30.5%",
    // fontSize: "15px",
  },
  containerSingleStatus: {
    marginBottom: "15%",
    fontFamily: "Arial",
    fontSize: "17px",
    color: "#524a41f6",
  },
  buttonYes: {
    color: "#8bc34a",
    marginLeft: "5%",
  },
  buttonNo: {
    color: "#ff8a65",
  },
  chatButton: {
    color: "#4db6ac",
    marginLeft: "5%",
  },
  paperContainerLeft: {
    height: 280,
    backgroundImage: `url(${friends1Pic})`,
    opacity: "100%",
  },
  paperContainerRight: {
    height: 280,
    backgroundImage: `url(${roomPic})`,
    opacity: "100%",
  },
  containerDetails: {
    backgroundColor: "#efebe9",
    marginRight: "10%",
    marginLeft: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
}));

export default function ShowStatusMatch() {
  const classes = useStyles();
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
        <h1 className={classes.h1}>Matching</h1>
        <h2 className={classes.h2}>Status</h2>
        <Box className={classes.line} borderTop={1}></Box>
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
  const classes = useStyles();

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
    <div className={classes.root}>
      <Grid container direction="row" className={classes.entirePage}>
        <Grid xs={1}></Grid>
        <Grid className={classes.sidePartLeft} xs={2}>
          <Paper className={classes.paperContainerLeft}></Paper>
        </Grid>

        <Grid className={classes.statusSide} xs={6}>
          <div className={classes.containerSingleStatus}>
            {choice === "yes" && (
              <div className="match-status">
                {/* <Paper className={classes.containerDetails}> */}
                <Box className={classes.boxDetails} border={1}>
                  <div className={classes.details}>
                    <p>
                      <b>Name: </b>
                      {user.firstName + " " + user.surName}
                    </p>
                    <p>
                      <b>Gender: </b>
                      {user.gender}
                    </p>
                    <p>
                      <b>Nationality: </b>
                      {user.nationality}
                    </p>
                    <p>
                      <b>Hobby: </b>
                      {user.hobby}
                    </p>
                    <p>
                      <b>Language: </b>
                      {user.language}
                    </p>
                    <p>
                      <b>Find a place to stay in: </b>
                      {user.preferStay}
                    </p>
                  </div>
                </Box>
                {/* </Paper> */}

                {userStatusMatch.clickedMatch === user.accountId.toString() ? (
                  <p className={classes.currentMatchStatus}>
                    This is your roommee
                  </p>
                ) : userStatusMatch.chat.indexOf(user.accountId.toString()) !==
                  1 ? (
                  <p className={classes.currentMatchStatus}>
                    Pending Invitation
                  </p>
                ) : (
                  <>
                    <p className={classes.currentMatchStatus}>Go and Say Hi!</p>
                    <Button className={classes.chatButton} onClick={onChat}>
                      Chat
                    </Button>
                  </>
                )}
                {userStatusMatch.clickedMatch !== user.accountId.toString() && (
                  <div className="status-buttons">
                    <label className={classes.ring}>Ring Roommee?</label>
                    <Button
                      className={classes.buttonYes}
                      onClick={() => {
                        setChoice("yes");
                      }}
                    >
                      Yes
                    </Button>
                    <Button className={classes.buttonNo} onClick={onRemove}>
                      No
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Grid>
        <Grid className={classes.sidePartRight} xs={2}>
          <Paper className={classes.paperContainerRight}></Paper>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </div>
  );
}
