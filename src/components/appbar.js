import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import TemporaryDrawer from "./menu";
import { useProfile } from "../api/profileApi";
import { useQuestionaire } from "../api/questionaireApi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1%",
    // display='flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "black",
    padding: "10px",
    display: "inline-block",
    textDecoration: "none",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  const {
    loadingQuestionaire,
    userQuestionaire,
    errorQuestionaire,
  } = useQuestionaire();

  if (loadingProfile || loadingQuestionaire) {
    return <p>Loading...</p>;
  }

  if (errorProfile || errorQuestionaire) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }

  console.log(userQuestionaire);
  console.log(userProfile);

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <TemporaryDrawer />

          <Typography variant="h6" className="nav-bar">
            <NavLink exact to="/" className={classes.link}>
              Home
            </NavLink>
          </Typography>

          {Array.isArray(userProfile) &&
          userProfile.length === 0 &&
          Array.isArray(userQuestionaire) &&
          userQuestionaire.length === 0 ? (
            <>
              <Typography variant="h6" className="nav-bar">
                <NavLink to="/profile" className={classes.link}>
                  Profile
                </NavLink>
              </Typography>
              <Typography variant="h6" className="nav-bar">
                <NavLink to="/questionaire" className={classes.link}>
                  Questionaire
                </NavLink>
              </Typography>
            </>
          ) : (
            <Typography variant="h6" className="nav-bar">
              <NavLink to="/matching" className={classes.link}>
                Matching
              </NavLink>
            </Typography>
          )}
          {userProfile.matchBuffer.length > 0 && (
            <Typography variant="h6" className="nav-bar">
              <NavLink to="/matching-status" className={classes.link}>
                Matching Status
              </NavLink>
            </Typography>
          )}

          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
