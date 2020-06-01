import React, { useState, useEffect } from "react";
import { useStatusMatch, likeUser } from "../api/matchApi";
import { useProfile } from "../api/profileApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Hidden,
} from "@material-ui/core";
import { borders } from "@material-ui/system";
import { Redirect } from "react-router-dom";

// const friends1Pic = "../../images/people.jpg";
const friends1Pic = process.env.PUBLIC_URL + "/images/people.jpg";
// const roomPic = "../../images/people1.jpg";
const roomPic = process.env.PUBLIC_URL + "/images/people1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#ffe0b2"
  },
  h1: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "1%",
    fontSize: "70px",
    fontFamily: "Raleway, Arial",
  },
  h1SS: {
    color: "#524a41f6",
    marginLeft: "25%",
    marginTop: "1%",
    fontSize: "50px",
    fontFamily: "Raleway, Arial",
  },
  h2SS: {
    color: "#524a41f6",
    marginLeft: "25%",
    marginTop: "-4%",
    fontSize: "20px",
    fontFamily: "Raleway, Arial",
  },
  h2: {
    color: "#524a41f6",
    marginLeft: "40%",
    marginTop: "-4%",
    fontSize: "30px",
    fontFamily: "Raleway, Arial",
  },
  line: {
    marginLeft: "8.5%",
    marginRight: "8.5%",
    marginBottom: "3%",
    color: "#524a41f6",
  },
  singleMatch: {
    marginBottom: "2%",
  },

  details: {
    paddingTop: "0.5%",
    paddingBottom: "0.5%",
    paddingRight: "17%",
    paddingLeft: "17%",
    backgroundColor: "#efebe9",
    borderRadius: 10,
  },
  detailsSS: {
    paddingTop: "0.5%",
    paddingBottom: "0.5%",
    paddingRight: "3%",
    paddingLeft: "4%",
    backgroundColor: "#efebe9",
    borderRadius: 10,
  },
  boxDetails: {
    marginRight: "20%",
    marginLeft: "20%",
    // color: "#efebe9"
    borderColor: "#d7ccc8",
    borderRadius: 10,
  },
  boxDetailsSS: {
    marginRight: "2%",
    marginLeft: "3%",
    borderColor: "#d7ccc8",
    borderRadius: 10,
  },
  currentMatchStatus: {
    paddingLeft: "30.5%",
  },
  currentMatchStatusSS: {
    paddingLeft: "7%",
  },
  ring: {
    paddingLeft: "30.5%",
  },
  ringSS: {
    paddingLeft: "7%",
  },
  containerSingleStatus: {
    marginBottom: "5%",
    fontFamily: "Arial",
    fontSize: "17px",
    color: "#524a41f6",
  },
  containerSingleStatusSS: {
    marginBottom: "5%",
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
    marginLeft: "10%",
  },
  buttonYesSS: {
    color: "#8bc34a",
    marginLeft: "2%",
  },
  buttonNoSS: {
    color: "#ff8a65",
  },
  chatButtonSS: {
    color: "#4db6ac",
    marginLeft: "10%",
  },

  paperContainerLeft: {
    backgroundSize: "cover",
    height: 300,
    backgroundImage: `url(${friends1Pic})`,
    opacity: "100%",
    borderRadius: 10,
  },
  paperContainerRight: {
    backgroundSize: "cover",
    height: 300,
    backgroundImage: `url(${roomPic})`,
    opacity: "100%",
    borderRadius: 10,
  },
  containerDetails: {
    backgroundColor: "#efebe9",
    marginRight: "10%",
    marginLeft: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  noStatus: {
    marginLeft: "15%",
    marginRight: "5%",
    paddingLeft: 10,
    paddingRight: 10,
    border: "1px solid white",
    backgroundColor: "#F9EADF",
    borderRadius: 5,
    width: "65%",
    height: "100%",
  },
  body: {
    flexGrow: 1
  },
}));

export default function ShowStatusMatch() {
  const classes = useStyles();
  const { loadingStatus, statusMatch, errorStatus } = useStatusMatch();
  const { loadingProfile, userProfile, errorProfile } = useProfile();

  if (loadingStatus || loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorStatus || errorProfile) {
    return <p>Something went wrong: {errorStatus.message}</p>;
  }

  console.log(userProfile);
  console.log(userProfile.roomList);
  console.log(statusMatch.pendingStatus);
  console.log(statusMatch.pendingStatus[0].accountId);
  // Display a list of the authors
  return (
    <>
      <div className="body">
        <Hidden mdDown>
          <h1 className={classes.h1}>Matching</h1>
          <h2 className={classes.h2}>Status</h2>
        </Hidden>
        <Hidden lgUp>
          <h1 className={classes.h1SS}>Matching</h1>
          <h2 className={classes.h2SS}>Status</h2>
        </Hidden>
        <Box className={classes.line} borderTop={1}></Box>
        {statusMatch.pendingStatus.length === 0 ? (
          <Box
            display="flex"
            justifyContext="center"
            className={classes.noStatus}
            overflow="auto"
          >
            <Typography>
              You have no matching status, please find a pick a roommee first in
              matching page
            </Typography>
            <br></br>
            <Box display="flex" justifyContext="center">
              <Button href="/matching">Find Roommee</Button>
            </Box>
          </Box>
        ) : (
          statusMatch.pendingStatus.map((userPending) => (
            <DivStatus
              key={userPending.accountId}
              matchData={statusMatch.userMatchData}
              user={userPending}
              chatRooms={userProfile.roomList}
              userName={userProfile.firstName}
            />
          ))
        )}
      </div>
    </>
  );
}

function DivStatus({ matchData, user, chatRooms, userName }) {
  const classes = useStyles();

  const [choice, setChoice] = useState("yes");
  const userStatusMatch = matchData;
  var chatRoomName = "";

  console.log(userStatusMatch.chat);

  console.log(user.accountId.toString());
  console.log(userStatusMatch.chat.indexOf(user.accountId.toString()));
  console.log(chatRooms);

  // find the roomname first
  chatRooms.forEach((room) => {
    if (room.listUsers.indexOf(user.accountId.toString()) !== -1) {
      chatRoomName = room.roomName;
    }
  });

  // useEffect(() => {
  //   likeUser({
  //     id: user.accountId,
  //     ans: choice,
  //   });
  // }, [choice, user.accountId]);

  async function removeUser() {
    console.log("removed");
    likeUser({
      id: user.accountId,
      ans: "no",
    });
  }

  // alert submit button when roommee trying to remove someone on his/her match status
  function onRemove() {
    confirmAlert({
      title: "Remove Confirmation",
      message:
        "The roommee will be removed from your status, but you can still find him/her in the match page. Please confirm your action",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await removeUser();
            setTimeout(function () {
              window.location.reload();
            }, 2000);
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
      <Hidden mdDown>
        <Grid container direction="row" className={classes.singleMatch}>
          <Grid xs={1} item></Grid>
          <Grid className={classes.sidePartLeft} item xs={2}>
            <Paper className={classes.paperContainerLeft}></Paper>
          </Grid>

          <Grid className={classes.statusSide} item xs={6}>
            <div className={classes.containerSingleStatus}>
              {choice === "yes" && (
                <div className="match-status">
                  {/* <Paper className={classes.containerDetails}> */}
                  <Box className={classes.boxDetails} border={0}>
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

                  {userStatusMatch.clickedMatch ===
                  user.accountId.toString() ? (
                    <p className={classes.currentMatchStatus}>
                      This is your roommee
                    </p>
                  ) : userStatusMatch.chat.indexOf(
                      user.accountId.toString()
                    ) === -1 ? (
                    <p className={classes.currentMatchStatus}>
                      Pending Invitation
                    </p>
                  ) : (
                    <>
                      <label className={classes.currentMatchStatus}>
                        Go and Say Hi!
                      </label>
                      <Link to={`/chat?name=${userName}&room=${chatRoomName}`}>
                        <Button className={classes.chatButton}>Chat</Button>
                      </Link>
                      {/* <Button className={classes.chatButton} onClick={onChat}>
                        Chat
                      </Button> */}
                      {/* <button type="submit">Go to room</button> */}
                    </>
                  )}
                  {userStatusMatch.clickedMatch !==
                    user.accountId.toString() && (
                    <div className="status-buttons">
                      <label className={classes.ring}>Remove Roommee?</label>

                      <Button className={classes.buttonNo} onClick={onRemove}>
                        Yes
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Grid>

          <Grid className={classes.sidePartRight} item xs={2}>
            <Paper className={classes.paperContainerRight}></Paper>
          </Grid>
          <Grid xs={1} item></Grid>
        </Grid>
      </Hidden>

      <Hidden lgUp>
        <div className={classes.containerSingleStatusSS}>
          {choice === "yes" && (
            <div className="match-status">
              {/* <Paper className={classes.containerDetails}> */}
              <Box className={classes.boxDetailsSS} border={0}>
                <div className={classes.detailsSS}>
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

              {userStatusMatch.clickedMatch === user.accountId.toString() ? (
                <p className={classes.currentMatchStatusSS}>
                  This is your roommee
                </p>
              ) : userStatusMatch.chat.indexOf(user.accountId.toString()) ===
                -1 ? (
                <p className={classes.currentMatchStatusSS}>
                  Pending Invitation
                </p>
              ) : (
                <>
                  <label className={classes.currentMatchStatusSS}>
                    Go and Say Hi!
                  </label>
                  <Link to={`/chat?name=${userName}&room=${chatRoomName}`}>
                    <Button className={classes.chatButton}>Chat</Button>
                  </Link>
                  {/* <Button className={classes.chatButtonSS} onClick={onChat}>
                    Chat
                  </Button> */}
                </>
              )}
              {userStatusMatch.clickedMatch !== user.accountId.toString() && (
                <div className="status-buttons">
                  <label className={classes.ring}>Remove Roommee?</label>

                  <Button className={classes.buttonNo} onClick={onRemove}>
                    Yes
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Hidden>
    </div>
  );
}
