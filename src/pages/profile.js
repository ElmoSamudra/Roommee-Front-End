import React, { useState } from "react";
import { useProfile, updateProfile } from "../api/profileApi";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import GenderBox from "../components/genderBox";
import { Input } from "@material-ui/core";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

// const bannerPic = "../../images/katarzyna-grabowska-oA1-rirIJ2E-unsplash.jpg";
const bannerPic =
  process.env.PUBLIC_URL +
  "/images/katarzyna-grabowska-oA1-rirIJ2E-unsplash.jpg";
const useStyles = makeStyles((theme) => ({
  profile: {
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "#F9EADF",
    paddingTop: 10,
    borderTopRightRadius: 15,
    paddingBottom: 40,
    height: "100%",
  },
  bannerContainer: {
    height: "auto",
    maxWidth: "100%",
    // objectFit: "cover",
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  gridParent: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: 15,
    height: "100%",
  },
  gridRight: {
    maxHeight: "100%",
  },
  gridRightTop: {
    paddingTop: 10,
    // maxHeight: "100%",
    height: "80%",
    paddingBottom: 40,
  },
  gridRightBottom: {
    backgroundColor: "#E3D1BA",
    // maxHeight: "100%",
    height: "20%",
    borderBottomRightRadius: 15,
  },
  textRight: {
    paddingLeft: "2%",
  },
  updateButton: {
    paddingTop: 31,
    paddingBottom: 31,
  },
  H1: {
    fontFamily: "Raleway, Arial",
    fontSize: "40px",
    paddingTop: "3%",
    paddingBottom: 14,
  },
  inputTextP: {
    fontFamily: "Raleway, Arial",
  },
  formbox: {
    height: "100%",
  },
  bannerGrid: {
    backgroundColor: "#392621",
    marginTop: 10,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
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

  const [firstNameInput, setFirstName] = useState(firstName || "");
  const [surNameInput, setSurName] = useState(surName || "");
  const [ageInput, setAge] = useState(age || 18);
  const [genderInput, setGender] = useState(gender || "");
  const [nationalityInput, setNationality] = useState(nationality || "");
  const [hobbyInput, setHobby] = useState(hobby || "");
  const [languageInput, setLanguage] = useState(language || "");
  const [preferStayInput, setPreferStay] = useState(preferStay || "");

  async function onSubmit() {
    const bool = await validate();
    console.log(bool);
    if (bool) {
      // call upate author function
      updateProfile({
        firstName: firstNameInput,
        surName: surNameInput,
        age: ageInput,
        gender: genderInput,
        nationality: nationalityInput.toLowerCase(),
        hobby: hobbyInput.toString().toLowerCase(),
        language: languageInput.toString().toLowerCase(),
        preferStay: preferStayInput.toString().toLowerCase(),
      });
    } else {
      toast.info("😺 Please fill all fields!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    }
  }

  async function validate() {
    if (
      firstNameInput === "" ||
      surNameInput === "" ||
      genderInput === "" ||
      nationalityInput === "" ||
      languageInput.length === 1 ||
      preferStayInput.length === 1
    ) {
      return false;
    } else {
      return true;
    }
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
          <Grid item xs={4} className={classes.bannerGrid}>
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
            <form className={classes.formbox}>
              <Grid item xs={12} className={classes.gridRightTop}>
                <Box className={classes.profile}>
                  <Typography className={classes.H1}>My Profile</Typography>
                  {/* <h1 >My Profile</h1> */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
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
                      <Typography className={classes.inputTextP}>
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
                      <Typography className={classes.inputTextP}>
                        <label>Age: </label>
                      </Typography>
                      <TextField
                        type="number"
                        name="age"
                        value={ageInput}
                        variant="outlined"
                        InputProps={{
                          inputProps: {
                            max: 100,
                            min: 18,
                          },
                        }}
                        onChange={(event) => {
                          setAge(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography className={classes.inputTextP}>
                        <label>Gender: </label>
                      </Typography>
                      {/* <Box width="50%">
                        <BinaryTabs init={genderInput} set={setGender} />
                      </Box> */}
                      <GenderBox init={genderInput} set={setGender} />
                    </Grid>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
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
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                container
                className={classes.gridRightBottom}
                align="center"
              >
                <Grid xs={6} item>
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
                <Grid xs={6} item>
                  <Box mx="auto" className={classes.updateButton}>
                    <Button
                      variant="outlined"
                      // className={classes.updateButton}
                      href="/questionaire"
                    >
                      Go to Questionnaire page
                    </Button>
                  </Box>
                </Grid>
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
            <form className={classes.formbox}>
              <Grid item xs={12} className={classes.gridRightTop}>
                <Box className={classes.profile}>
                  <Typography className={classes.H1}>My Profile</Typography>
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
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
                      <Typography className={classes.inputTextP}>
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
                      <Typography className={classes.inputTextP}>
                        <label>Age: </label>
                      </Typography>
                      <TextField
                        type="number"
                        name="age"
                        value={ageInput}
                        variant="outlined"
                        InputProps={{
                          inputProps: {
                            max: 100,
                            min: 18,
                          },
                        }}
                        onChange={(event) => {
                          setAge(event.target.value);
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography className={classes.inputTextP}>
                        <label>Gender: </label>
                      </Typography>
                      {/* <Box width="50%">
                        <BinaryTabs init={genderInput} set={setGender} />
                      </Box> */}
                      <GenderBox init={genderInput} set={setGender} />
                    </Grid>
                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
                        <label>Nationality: </label>
                      </Typography>
                      <Input
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
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textLeft}>
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.textRight}>
                      <Typography className={classes.inputTextP}>
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
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                container
                className={classes.gridRightBottom}
                align="center"
              >
                <Grid item xs={6}>
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
                <Grid>
                  <Box mx="auto" className={classes.updateButton}>
                    <Button
                      variant="outlined"
                      // className={classes.updateButton}
                      href="/questionaire"
                    >
                      Go to Questionnaire page
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}
