import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import { useQuestionaire } from "../api/questionaireApi";
import Menu from "./menu2";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    fontSize: "15px",
  },
}));

export default function ButtonAppBar() {
  let history = useHistory();

  const classes = useStyles();
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  const {
    loadingQuestionaire,
    userQuestionaire,
    errorQuestionaire,
  } = useQuestionaire();

  if (userProfile.error != null) {
    history.push("/");
  }

  function logOut() {
    localStorage.removeItem("token");
    history.push("/");
  }

  if (loadingProfile || loadingQuestionaire) {
    return <p>Loading...</p>;
  }

  if (errorProfile || errorQuestionaire) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          {userProfile.nationality === "" ||
          userQuestionaire.filter1.sameNationalityPref === "" ? (
            <></>
          ) : (
            <Menu />
          )}
          <Typography variant="h6" className="nav-bar">
            <NavLink exact to="/home" className={classes.link}>
              <Button>Home</Button>
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
            <></>
          )}
          {userProfile.matchBuffer.length > 0 && (
            <Typography variant="h6" className="nav-bar">
              <NavLink to="/matching-status" className={classes.link}>
                Matching Status
              </NavLink>
            </Typography>
          )}
          <Box display="flex" justifyContent="flex-end" width={"100%"}>
            <Button color="inherit" onClick={() => logOut()}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
