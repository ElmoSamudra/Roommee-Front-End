import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Typography, makeStyles, Box } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import { useProfile } from "../api/profileApi";
import { useQuestionaire } from "../api/questionaireApi";
import MatchControlCard from "../components/matchCard";
const logoImage = "/images/roommeelogo2.png";

const useStyles = makeStyles((theme) => ({
  paddings: {
    paddingTop: "100px",
  },
  firstInfo: {
    paddingTop: "15px",
  },
  secondInfo: {
    paddingTop: "15px",
    backgroundColor: "#fdf8f4",
  },
  formStyle: {
    paddingBottom: "20px",
  },
  frontImage: {
    backgroundColor: "#fdf8f4",
    paddingBottom: "50px",
  },
  login: {
    borderRight: "solid",
    borderWidth: "0.25px",
  },
  buttonStyles: {
    background: "#fdeab9",
    maxWidth: "600px",
    maxHeight: "75px",
    minWidth: "100px",
    minHeight: "75px",
  },
  body: {
    flexGrow: 1,
  },
}));

function FrontPage() {
  const classes = useStyles();

  const [checked, setChecked] = useState(true);
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  const {
    loadingQuestionaire,
    userQuestionaire,
    errorQuestionaire,
  } = useQuestionaire();

  // //Setting up REDUX to save to store what is the current page for later use in the navigation bar
  // const dispatch = useDispatch();
  // const setLogPage = () => {
  //   return {
  //     type: "LOGIN",
  //   };
  // };
  // dispatch(setLogPage());

  if (loadingProfile || loadingQuestionaire) {
    return <p>Loading...</p>;
  }
  if (errorProfile || errorQuestionaire) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }

  return (
    <div className={classes.body}>
      <Grid container spacing={2} className={classes.frontImage}>
        <Grid item xs={12} align="center" className={classes.paddings}>
          <Box>
            <Zoom in={checked} timeout={{ enter: 1500 }}>
              <img src={process.env.PUBLIC_URL + logoImage} alt="logoImage" />
            </Zoom>
          </Box>
        </Grid>

        <Grid item xs={12} align="center">
          <Zoom in={checked} timeout={{ enter: 1500 }}>
            <Typography variant="subtitle1" align="center">
              Dedicated in helping everyone find their mates everyday.
            </Typography>
          </Zoom>
          <Typography variant="h5" align="center">
            <br />
          </Typography>
        </Grid>

        {userProfile.age === undefined &&
        userQuestionaire.filter1.sameNationalityPref === "" ? (
          <>
            {/* <Grid item xs={12} align="center" className={classes.login}>
              <Button
                variant="contained"
                className={classes.buttonStyles}
                href="/profile"
              >
                <Typography variant="h5">Profile</Typography>
              </Button>
            </Grid> */}
            {/* <Grid item xs={6} align="center">
              <Button
                variant="contained"
                className={classes.buttonStyles}
                href="/questionaire"
              >
                <Typography variant="h5">Questionnaire</Typography>
              </Button>
            </Grid> */}
          </>
        ) : (
          <>
            {/* <Grid item xs={6} align="center" className={classes.login}>
              <Button
                variant="contained"
                className={classes.buttonStyles}
                href="/home"
              >
                <Typography variant="h5">List Property</Typography>
              </Button>
            </Grid>

            <Grid item xs={6} align="center">
              <Button
                variant="contained"
                className={classes.buttonStyles}
                href="/matching"
              >
                <Typography variant="h5">Find Roommee</Typography>
              </Button>
            </Grid> */}
          </>
        )}
        {/* 
        <Grid item xs={12} align="center">
          <Typography variant="h1" align="center">
            Details on how to find ROOMMEE!
          </Typography>
        </Grid> */}
      </Grid>
      {userProfile.age !== undefined &&
      userQuestionaire.filter1.sameNationalityPref !== "" ? (
        <MatchControlCard state={true} />
      ) : (
        <MatchControlCard state={false} />
      )}
    </div>
  );
}
export default FrontPage;
