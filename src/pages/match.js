import React, { useState } from "react";
import { useMatch, likeUser, useStatusMatch } from "../api/matchApi";
import { useProfile } from "../api/profileApi";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import { ToggleButton } from "@material-ui/lab";
import "react-toastify/dist/ReactToastify.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function ShowMatch() {
  const { loadingMatch, userMatch, errorMatch } = useMatch();
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  const { loadingStatus, statusMatch, errorStatus } = useStatusMatch();

  if (loadingMatch || loadingProfile || loadingStatus) {
    return <p>Loading...</p>;
  }
  if (errorMatch || errorProfile || errorStatus) {
    return <p>Something went wrong: {errorMatch.message}</p>;
  }

  // filter the match first so that it wont be redundant with match status
  function filterMatch(matches, status) {
    const userIds = status.map((user) => user.accountId);
    let newMatches = [];
    matches.forEach((match) => {
      if (userIds.indexOf(match.accountId.toString()) === -1) {
        newMatches.push(match);
      }
    });
    return newMatches;
  }

  // use this to make sure you are getting the right data
  console.log(userMatch);

  const newMatch = filterMatch(userMatch, statusMatch.pendingStatus);
  console.log(newMatch.length);

  // Display a list of the authors
  return (
    <div>
      <Match key={userProfile.accountId} {...newMatch} />
    </div>
  );
}

const vector = "./../images/Artboard1.png";
const useStyles = makeStyles((theme) => ({
  poster: {
    backgroundImage: `url(${vector})`,
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    borderRadius: 15,
  },
  profileMatch: {
    height: "100%",
  },
  profForm: {
    backgroundColor: "#F3DFB3",
    padding: "5%",
    marginRight: "10%",
    borderRadius: 15,
    height: "100%",
    width: "350px",
    paddingBottom: 30,
  },
  pict: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  nextButtonLeft: {
    marginLeft: "50%",
    marginTop: "35%",
  },
  nextButtonRight: {
    marginRight: "50%",
    marginTop: "35%",
  },
  nextButtonSmallBottom: {
    marginBottom: 20,
    marginLeft: 30,
  },
  nextButtonSmallTop: {
    marginTop: 20,
    marginLeft: 23,
  },
  boxUndefined: {
    backgroundColor: "#F3DFB3",
    marginRight: "10%",
    padding: "5%",
    borderRadius: 15,
  },
  root: {
    height: 100,
    width: 50,
  },
  container: {
    display: "flex",
  },
}));

// matches here is an array of match users
function Match(matches) {
  const allMatches = matches;
  const lenMatches = Object.keys(allMatches).length;
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  var [fadeIndex, setFadeIndex] = useState(
    Object.keys(allMatches).map((user) => false)
  );
  const [check, setCheck] = useState(false);

  // almost
  // increment or decrement the match by 1
  function nextMatch() {
    setIndex(index + 1);
    setCheck(fadeIndex[index + 1]);
  }

  function prevMatch() {
    setIndex(index - 1);
    setCheck(fadeIndex[index - 1]);
  }

  const handleChange = async (index) => {
    fadeIndex[index] = !fadeIndex[index];
    setCheck(fadeIndex[index]);
    setFadeIndex(fadeIndex);
  };
  // choice is the yes or no button
  async function likedProfileChoice(choice) {
    if (!choice) {
      choice = "yes";
    } else {
      choice = "no";
    }
    await likeUser({
      id: allMatches[index].accountId,
      ans: choice,
    });
    if (choice === "yes") {
      toast.info("Nice!, check them in your match status page!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info("Whoops!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className={classes.profileMatch}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.poster}
      >
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            {lenMatches !== 0 ? (
              <form className={classes.profForm}>
                <Grid container item spacing={2}>
                  <Hidden mdUp>
                    <Grid xs={12} item>
                      <Box display="flex" justifyContent="center">
                        <Avatar className={classes.pict}>H</Avatar>
                      </Box>
                    </Grid>
                  </Hidden>
                  <Hidden smDown>
                    <Grid xs={6} item>
                      <Avatar className={classes.pict}>H</Avatar>
                    </Grid>
                  </Hidden>
                  <Grid container item xs={6}>
                    <Grid xs={12} item>
                      <Typography>First name</Typography>
                      <label>{allMatches[index].firstName}</label>
                    </Grid>
                    <Grid xs={12} item>
                      <Typography>Surname</Typography>
                      <label>{allMatches[index].surName}</label>
                    </Grid>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Age</Typography>
                    <label>{allMatches[index].age}</label>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Gender</Typography>
                    <label>{allMatches[index].gender}</label>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Nationality</Typography>
                    <label>{allMatches[index].nationality}</label>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Hobby</Typography>
                    <label>{allMatches[index].hobby}</label>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Language</Typography>
                    <label>{allMatches[index].language}</label>
                  </Grid>
                  <Grid xs={6} item>
                    <Typography>Looking for a place to stay in</Typography>
                    <label>{allMatches[index].preferStay}</label>
                  </Grid>
                  <Hidden mdUp>
                    <Grid xs={6} item>
                      {index > 0 && (
                        <ToggleButton
                          onClick={prevMatch}
                          className={classes.nextButtonSmallTop}
                        >
                          <ArrowBackIcon />
                        </ToggleButton>
                      )}
                    </Grid>
                  </Hidden>
                  <Grid xs={12} container item>
                    <Hidden smDown>
                      <Grid xs={4} item>
                        {/* <SimpleFade func={likedProfileChoice} check={fade} /> */}

                        <div className={classes.root}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={check}
                                onChange={async () => {
                                  // await handleChange();
                                  await handleChange(index);
                                  console.log(fadeIndex);
                                  await likedProfileChoice(check);
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ fontSize: "15px", fontColor: "white" }}
                              >
                                {"Ring Roommee?"}
                              </span>
                            }
                          />
                          <div className={classes.container}>
                            <Fade in={check}>
                              <Typography>
                                You have rang this roommie!
                              </Typography>
                            </Fade>
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={8} container item>
                        <Grid xs={6} item>
                          {index > 0 && (
                            <ToggleButton
                              onClick={prevMatch}
                              className={classes.nextButtonLeft}
                            >
                              <ArrowBackIcon />
                            </ToggleButton>
                          )}
                        </Grid>
                        <Grid xs={6} item>
                          {index < lenMatches - 1 && (
                            <ToggleButton
                              onClick={nextMatch}
                              className={classes.nextButtonRight}
                            >
                              <ArrowForwardIcon />
                            </ToggleButton>
                          )}
                        </Grid>
                      </Grid>
                    </Hidden>
                    <Hidden mdUp>
                      <Grid xs={6} item>
                        {/* <SimpleFade func={likedProfileChoice} check={fade} /> */}

                        <div className={classes.root}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={check}
                                onChange={async () => {
                                  // await handleChange();
                                  await handleChange(index);
                                  console.log(fadeIndex);
                                  await likedProfileChoice(check);
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ fontSize: "15px", fontColor: "white" }}
                              >
                                {"Ring Roommee?"}
                              </span>
                            }
                          />
                          <div className={classes.container}>
                            <Fade in={check}>
                              <Typography>
                                You have rang this roommie!
                              </Typography>
                            </Fade>
                          </div>
                        </div>
                      </Grid>

                      <Grid xs={6} container item>
                        <Grid xs={6} item>
                          {index < lenMatches - 1 && (
                            <ToggleButton
                              onClick={nextMatch}
                              className={classes.nextButtonSmallBottom}
                            >
                              <ArrowForwardIcon />
                            </ToggleButton>
                          )}
                        </Grid>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Box width="25%" className={classes.boxUndefined}>
                <Typography>
                  Sorry we don't have any other user that matches with your
                  profile. Please wait for the invitation in your match status
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
