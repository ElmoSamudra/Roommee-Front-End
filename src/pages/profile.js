import React, { useState } from "react";
import { useProfile, updateProfile } from "../api/profileApi";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import BinaryTabs from "../components/tab";
import Hidden from "@material-ui/core/Hidden";

//import Button from "../components/button";

export default function ShowProfile() {
  const { loadingProfile, userProfile, errorProfile } = useProfile();
  if (loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorProfile) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }
  console.log("called");
  // use this to make sure you are getting the right data
  console.log(userProfile);

  // Display a list of the authors
  return (
    <div>
      <Profile key={userProfile.accountId} {...userProfile} />
    </div>
  );
}

const bannerPic = "../../images/katarzyna-grabowska-oA1-rirIJ2E-unsplash.jpg";
const useStyles = makeStyles((theme) => ({
  profile: {
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#F9EADF",
    paddingTop: 10,
    borderTopRightRadius: 15,
    paddingBottom: 40,
  },
  bannerContainer: {
    maxHeight: "100%",
    maxWidth: "100%",
    paddingTop: 10,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  gridParent: {
    display: "flex",
    flexWrap: "wrap",
  },
  gridRight: {
    maxHeight: "100%",
  },
  gridRightTop: {
    paddingTop: 10,
    maxHeight: "100%",
  },
  gridRightBottom: {
    backgroundColor: "#E3D1BA",
    maxHeight: "100%",
    borderBottomRightRadius: 15,
  },
  // textLeft: {
  //   paddingLeft: "27px",
  // },
  textRight: {
    paddingLeft: "2%",
  },
  updateButton: {
    paddingTop: 31,
    paddingBottom: 31,
  },
}));

function Profile(profile) {
  const classes = useStyles();

  const {
    firstName,
    surName,
    age,
    gender,
    nationality,
    hobby,
    language,
    preferStay,
  } = profile;
  //const [showUpdate, setShowUpdate] = useState(false);

  const [firstNameInput, setFirstName] = useState(firstName);
  const [surNameInput, setSurName] = useState(surName);
  const [ageInput, setAge] = useState(age);
  const [genderInput, setGender] = useState(gender);
  const [nationalityInput, setNationality] = useState(nationality);
  const [hobbyInput, setHobby] = useState(hobby);
  const [languageInput, setLanguage] = useState(language);
  const [preferStayInput, setPreferStay] = useState(preferStay);

  function onSubmit() {
    // call upate author function
    updateProfile({
      firstName: firstNameInput,
      surName: surNameInput,
      age: ageInput,
      gender: genderInput.toLowerCase(),
      nationality: nationalityInput.toLowerCase(),
      hobby: hobbyInput.toString().toLowerCase(),
      language: languageInput.toString().toLowerCase(),
      preferStay: preferStayInput.toString().toLowerCase(),
    });
  }

  return (
    // <div className={`profile user-${accountId}`} key={accountId}>
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="stretch"
        className={classes.gridParent}
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <Hidden smDown>
          <Grid item xs={4}>
            <img
              src={bannerPic}
              alt=""
              className={classes.bannerContainer}
            ></img>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid
            item
            xs={12}
            container
            direction="column"
            className={classes.gridRight}
          >
            <form>
              <Grid item xs={12} className={classes.gridRightTop}>
                <Box className={classes.profile}>
                  <Typography>
                    <h1>My Profile</h1>
                  </Typography>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>First name: </label>
                      </Typography>
                      <TextField
                        name="firstName"
                        value={firstNameInput}
                        variant="outlined"
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Surname: </label>
                      </Typography>
                      <TextField
                        name="surName"
                        value={surNameInput}
                        variant="outlined"
                        onChange={(event) => {
                          setSurName(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Age: </label>
                      </Typography>
                      <TextField
                        type="number"
                        name="age"
                        value={ageInput}
                        variant="outlined"
                        onChange={(event) => {
                          setAge(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Gender: </label>
                      </Typography>
                      <box width="50%">
                        <BinaryTabs init={genderInput} set={setGender} />
                      </box>
                    </Grid>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Nationality: </label>
                      </Typography>
                      <TextField
                        name="nationality"
                        value={nationalityInput}
                        variant="outlined"
                        onChange={(event) => {
                          setNationality(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Hobby: </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="hobby"
                        value={hobbyInput}
                        variant="outlined"
                        onChange={(event) => {
                          setHobby(event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Language: </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="language"
                        value={languageInput}
                        variant="outlined"
                        onChange={(event) => {
                          setLanguage(event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Find a place to stay in (suburb): </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="preferStay"
                        value={preferStayInput}
                        variant="outlined"
                        onChange={(event) => {
                          setPreferStay(event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.gridRightBottom} align="center">
                <Box mx="auto" className={classes.updateButton}>
                  <Button
                    variant="outlined"
                    // className={classes.updateButton}
                    onClick={onSubmit}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </form>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid
            item
            xs={7}
            container
            direction="column"
            className={classes.gridRight}
          >
            <form>
              <Grid item xs={12} className={classes.gridRightTop}>
                <Box className={classes.profile}>
                  <Typography>
                    <h1>My Profile</h1>
                  </Typography>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>First name: </label>
                      </Typography>
                      <TextField
                        name="firstName"
                        value={firstNameInput}
                        variant="outlined"
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Surname: </label>
                      </Typography>
                      <TextField
                        name="surName"
                        value={surNameInput}
                        variant="outlined"
                        onChange={(event) => {
                          setSurName(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Age: </label>
                      </Typography>
                      <TextField
                        type="number"
                        name="age"
                        value={ageInput}
                        variant="outlined"
                        onChange={(event) => {
                          setAge(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Gender: </label>
                      </Typography>
                      <box width="50%">
                        <BinaryTabs init={genderInput} set={setGender} />
                      </box>
                    </Grid>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Nationality: </label>
                      </Typography>
                      <TextField
                        name="nationality"
                        value={nationalityInput}
                        variant="outlined"
                        onChange={(event) => {
                          setNationality(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Hobby: </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="hobby"
                        value={hobbyInput}
                        variant="outlined"
                        onChange={(event) => {
                          setHobby(event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography>
                        <label>Language: </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="language"
                        value={languageInput}
                        variant="outlined"
                        onChange={(event) => {
                          setLanguage(event.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography>
                        <label>Find a place to stay in (suburb): </label>
                      </Typography>
                      <TextField
                        type="text"
                        name="preferStay"
                        value={preferStayInput}
                        variant="outlined"
                        onChange={(event) => {
                          setPreferStay(event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item className={classes.gridRightBottom} align="center">
                <Box mx="auto" className={classes.updateButton}>
                  <Button
                    variant="outlined"
                    // className={classes.updateButton}
                    onClick={onSubmit}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </form>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}
