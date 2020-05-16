import React, { useState } from "react";
import { logIn } from "../api/register&loginApi";
import { useHistory } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import { Button, Grid, TextField } from "@material-ui/core";
import { Typography, makeStyles, Box } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import Hidden from "@material-ui/core/Hidden";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";

const humanImage = '/images/human.png'
const gearImage = '/images/gears.png'
const logoImage = '/images/roommeelogo2.png'

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
    height: "100%",
    backgroundColor: "#fdf8f4",
    paddingBottom: "50px",
  },
  login: {
    borderRight: "solid",
    borderWidth: "0.25px",
  },
}));

function FrontPage(details) {
  const { email, password } = details;
  const classes = useStyles();

  let history = useHistory();

  const [emailInput, setEmail] = useState(email);
  const [passwordInput, setPassword] = useState(password);

  const [checked, setChecked] = useState(true);

  //Setting up REDUX to save to store what is the current page for later use in the navigation bar
  const dispatch = useDispatch();
  const setLogPage = () => {
    return {
      type: "LOGIN",
    };
  };
  dispatch(setLogPage());

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let result = await logIn({
        email: emailInput,
        password: passwordInput,
      });

      if (result) {
        if (result.status === 200) {
          let resultInJSON = await result.json();
          localStorage.setItem("token", resultInJSON.token);
          localStorage.setItem("account", resultInJSON.account);
          history.push("/home");
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
        history.push("/404");
      }
    } catch (e) {
      history.push("/404");
    }
  }

  return (
    <div>
      <Grid container spacing={2} className={classes.frontImage}>
        <Grid item xs={12} align="center" className={classes.paddings}>
          <Box>
            <Zoom in={checked} timeout={{ enter: 1500 }}>
              <img src={process.env.PUBLIC_URL + logoImage} alt="logoImage" />
            </Zoom>
            <Typography variant="subtitle1" align="center">
              Dedicated in helping everyone find their mates everyday.
              <br />
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} align="center">
          <Zoom in={checked} timeout={{ enter: 1500 }}>
            <Button href="/register" variant="outlined">
              Register Now
            </Button>
          </Zoom>
          <Typography variant="h5" align="center">
            <br />
          </Typography>
        </Grid>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={6} align="center" className={classes.login}>
            <Box>
            <Slide in={checked} timeout={{ enter: 1500 }}>
              <Typography variant="h3">
                Match with your future roommates with Roommee.
              </Typography>
            </Slide>
            <Slide in={checked} timeout={{ enter: 1500 }}>
              <Typography variant="h5">
                <br />
                Personalised matching
                <br />
                Find housing together with your mate in app
                <br />
                Connecting you to your favourite utilities
              </Typography>
            </Slide>
            </Box>
          </Grid>
        </Hidden>
        

        <Grid item xs={6} align="center">
          <Slide in={checked} timeout={{ enter: 1500 }}>
            <Typography variant="h3" className={classes.formStyle}>
              Welcome Back
            </Typography>
          </Slide>
          <FormLabel>
            <Box className={classes.formStyle}>
              <Slide in={checked} timeout={{ enter: 1500 }}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  placeholder="Email"
                  name="email"
                  value={emailInput}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Slide>
            </Box>
            <Box className={classes.formStyle}>
              <Slide in={checked} timeout={{ enter: 1500 }}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={passwordInput}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Slide>
            </Box>
            <Box className={classes.formStyle}>
              <Slide in={checked} timeout={{ enter: 1500 }}>
                <Button variant="outlined" onClick={onSubmit}>
                  Login
                </Button>
              </Slide>
            </Box>
          </FormLabel>
        </Grid>
      </Grid>
      <Grid container className={classes.firstInfo}>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={6} align="center">
            <img src={process.env.PUBLIC_URL + humanImage} alt="humanImage" />
          </Grid>
        </Hidden>
        <Grid item xs={6} align="center">
          <Box>
            <Typography variant="h3" align="left">
              What we do
            </Typography>
            <Typography variant="subtitle1" align="left">
              We do the work. You Decide.<br/>
            </Typography>
            <Typography variant="body1" align="left">
              With personalised matching, we will give you user 
              suggestions that is closest to you.<br/>
              Provide you with the best housing deals.<br/>
              Hook you up with the best utilities in an instant.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.secondInfo}>
        <Hidden only={["xs", "sm"]}>
          <Grid item xs={6} align="center">
            <img src={process.env.PUBLIC_URL + gearImage} alt="gearImage" />
          </Grid>
        </Hidden>
        <Grid item xs={6} align="center">
          <Box>
            <Typography variant="h3" align="left">
              What can I do?
            </Typography>
            <Typography variant="subtitle1" align="left">
              If you choose to you will be able to.<br/>
            </Typography>
            <Typography variant="body1" align="left">
              1)Choose who you want to match with.<br/>
              2)Choose which place to stay.<br/>
              3)Choose which utility company to go with. 
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default FrontPage;
