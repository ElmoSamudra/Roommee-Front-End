import React, { useState, useEffect } from "react";
import { useStatusMatch, likeUser } from "../api/matchApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, TextField, Button, Box } from "@material-ui/core";
import { borders } from '@material-ui/system';


const friends1Pic = "../../images/friends1.jpg";
const roomPic = "../../images/room.jpg";

const useStyles = makeStyles((theme) => ({
  h1:{
    color: "#524a41f6",
    marginLeft: "38%",
    fontSize: "36px"
  },
  sidePartRight: {
    backgroundColor: "#ffe0b2",
  },
  sidePartLeft: {
    backgroundColor: "#FCDB87",
  },
  details: {
    paddingRight: "10%",
    paddingLeft: "10%",
  },
  boxDetails: {
    marginRight: "10%",
    marginLeft: "10%",
  },
  currentMatchStatus: {
    paddingLeft: "18%",
  },
  ring: {
    paddingLeft: "18%",
  },
  containerSingleStatus: {
    marginBottom: "15%",
    fontFamily: "Arial",
    fontSize: "15px",
    color: "#524a41f6",
  },
  buttonYes: {
    color: "#8bc34a",
    marginLeft: "10%"
  },
  buttonNo: {
    color: "#ff8a65",
  },
  paperContainerLeft: {
    height: 280,
    backgroundImage: `url(${friends1Pic})`,
  },
  paperContainerRight: {
    height: 280,
    backgroundImage: `url(${roomPic})`,
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
      <h1 className={classes.h1}>Matching Status</h1>
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
      
    <Grid
      container
      direction="row"
      className={classes.entirePage}
    >
      <Grid xs={1}>
      </Grid>
      <Grid className={classes.sidePartLeft}xs={3}>
        <Paper className={classes.paperContainerLeft}></Paper>
      </Grid>

      <Grid className={classes.statusSide} xs={4}>
        
        <div className={classes.containerSingleStatus}>
        {choice === "yes" && (
          <div className="match-status">
            <Box className={classes.boxDetails} border={1}>
            <div className={classes.details}>
              <p>Name: {user.firstName + " " + user.surName}</p>
              <p>Gender: {user.gender}</p>
              <p>Nationality: {user.nationality}</p>
              <p>Hobby: {user.hobby}</p>
              <p>Language: {user.language}</p>
              <p>Find a place to stay in: {user.preferStay}</p>
            </div>
            </Box>

            {userStatusMatch.clickedMatch === user.accountId.toString() ? (
              <p className={classes.currentMatchStatus}>
                This is your roommee
              </p>
            ) : userStatusMatch.chat.indexOf(user.accountId.toString()) !== 1 ? (
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
                <Button className={classes.buttonNo}
                 onClick={onRemove}>
                  No
                </Button>
              </div>
              )}
            </div>
        )}
        </div>
      </Grid>
      <Grid className={classes.sidePartRight}xs={3}>
        <Paper className={classes.paperContainerRight}></Paper>
      </Grid>
      <Grid xs={1}>
      </Grid>
    </Grid>
  </div>              
  );
}
