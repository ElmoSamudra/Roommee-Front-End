import React, { useState } from "react";
import {
  useProfile,
  updateProfile,
  updatePass,
  updateEmail,
} from "../api/profileApi";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import GenderBox from "../components/genderBox";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

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
    height: "100%",
    width: "100%",
    objectFit: "cover",
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
    backgroundImage: `url(${bannerPic})`,
    backgroundColor: "#392621",
    // backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // width: "100%",
    // maxHeight: "100%",
    marginTop: 10,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  profPic: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    padding: "auto",
    margin: "auto",
    marginTop: "5%",
  },
  // input: {
  //   backgroundColor: "#F9EADF",
  // },
  changePassButton: {
    margin: "auto",
    width: "50%",
  },
  passBox: {
    backgroundColor: "#F9EADF",
    padding: 20,
    borderRadius: 15,
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
  const [passwordInput, setPassword] = useState([] || "");
  const [validatePass, setValidatePass] = useState([]);
  const [emailInput, setEmail] = useState([] || "");
  const [popPass, setPopPass] = useState(false);
  const [popEmail, setPopEmail] = useState(false);

  async function onSubmit() {
    const bool = await validate();
    console.log(bool);
    if (bool) {
      // call upate author function
      const reqStatus = await updateProfile({
        firstName: firstNameInput,
        surName: surNameInput,
        age: ageInput,
        gender: genderInput,
        nationality: nationalityInput.toLowerCase(),
        hobby: hobbyInput.toString().toLowerCase(),
        language: languageInput.toString().toLowerCase(),
        preferStay: preferStayInput.toString().toLowerCase(),
      });
      console.log(reqStatus);
      if (reqStatus.status === 200) {
        window.location.reload();
      } else {
        toast.info("😺 Please input all fields correctly!", {
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

  function authenticatePopPass() {
    setPopPass(!popPass);
  }

  function authenticatePopEmail() {
    setPopEmail(!popEmail);
  }

  async function authenticate(type) {
    if (type === "pass") {
      if (validatePass === passwordInput) {
        let result = await updatePass(passwordInput);
        if (result.status === 200) {
          window.location.reload();
        } else {
          toast.info("😺 Please input all fields correctly!", {
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
      } else {
        toast.info("😺 Password does not match", {
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
    } else {
      console.log("masuk udpate");
      let result = await updateEmail(emailInput);
      if (result.status === 200) {
        window.location.reload();
      } else {
        toast.info("😺 Please input all fields correctly!", {
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
  }

  // succeed
  // async function checkPass(type) {
  //   const valResult = await validateEmail(curEmail);
  //   if (valResult === true) {
  //     setHidden(true);
  //   } else {
  //     toast.info("😺 Wrong Email", {
  //       position: "top-center",
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       transition: Flip,
  //     });
  //   }
  // }
  // need to ask Eldar how the password thing works
  // need to ask Eldar how to update the password and email
  // need to ask Eldar how to use the encrypt password
  // if (curPass === passwordInput) {
  //   setHidden(true);
  // }

  async function validate() {
    console.log(languageInput);
    if (
      firstNameInput === "" ||
      surNameInput === "" ||
      genderInput === "" ||
      nationalityInput === "" ||
      languageInput[0] === "" ||
      languageInput === "" ||
      preferStayInput[0] === "" ||
      preferStayInput === ""
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
            {/* <img
              src={bannerPic}
              alt=""
              className={classes.bannerContainer}
            ></img> */}
            <Avatar className={classes.profPic}>
              {firstNameInput[0].toUpperCase() + surNameInput[0].toUpperCase()}
            </Avatar>
            <Box
              display="flex block"
              justifyContent="center"
              className={classes.changePassButton}
            >
              <Button
                variant="contained"
                color="primary"
                // className={classes.updateButton}
                onClick={authenticatePopPass}
              >
                Change Password
              </Button>
              {popPass === true ? (
                <Box className={classes.passBox}>
                  <Typography>New Password</Typography>
                  <TextField
                    variant="filled"
                    type="password"
                    name="new-pass"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <Typography>Confirm Password</Typography>
                  <TextField
                    variant="filled"
                    type="password"
                    name="confirm-pass"
                    InputProps={{
                      className: classes.input,
                    }}
                    onChange={(event) => {
                      setValidatePass(event.target.value);
                    }}
                  />

                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      // className={classes.updateButton}
                      onClick={() => {
                        authenticate("pass");
                      }}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.changePassButton}
            >
              <Button
                // className={classes.updateButton}
                onClick={authenticatePopEmail}
                variant="contained"
                color="primary"
              >
                Change Email
              </Button>
              {popEmail === true ? (
                <Box>
                  <Typography>Change Email</Typography>
                  <TextField
                    variant="filled"
                    type="text"
                    name="update-email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <Button
                    variant="outlined"
                    // className={classes.updateButton}
                    onClick={() => {
                      authenticate("email");
                    }}
                  >
                    Update Email
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
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
