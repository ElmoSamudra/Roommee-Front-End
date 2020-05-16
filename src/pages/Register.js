import React, { useState } from "react";
import { signUp } from "../api/register&loginApi";
import { useHistory } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import { useDispatch } from "react-redux";
import Slide from "@material-ui/core/Slide";

import {
  Button,
  TextField,
  Checkbox,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  entireGrid: {
    backgroundColor: "#f9eadf",
  },
  formStyle: {
    width: "50%",
  },
  text: {
    align: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

export default function Register() {
  const classes = useStyles();

  let history = useHistory();

  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();
  const setLogPage = () => {
    return {
      type: "REGISTER",
    };
  };

  dispatch(setLogPage());

  const [nameInput, setFirstName] = useState("");
  const [surInput, setLastName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [termsInput, setTerms] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (
      nameInput === "" ||
      surInput === "" ||
      emailInput === "" ||
      passwordInput === ""
    ) {
      toast.info("😿 please fill all fields!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      return;
    }
    if (termsInput === false) {
      toast.info(
        "😿 We cannot continue without you agreeing to our Terms and Conditions!",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        }
      );
      return;
    }

    let result = await signUp({
      name: nameInput,
      surname: surInput,
      email: emailInput,
      password: passwordInput,
      terms: termsInput,
    });

    if (result.status === 201) {
      history.push("/");
    } else if (result.status === 400) {
      toast.info(result.statusText, {
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

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item align="center">
        <Box className={classes.text}>
          <Slide in={checked} timeout={{ enter: 1500 }}>
            <Typography variant="h2">Register Yourself</Typography>
          </Slide>  
          <br />
          <Slide in={checked} timeout={{ enter: 1500 }}>
            <Typography variant="body1">
              Before connecting with other wonderful roommees, <br />
              help us to know more about you first!
            </Typography>
          </Slide>
          <br />
          <br />
        </Box>
      </Grid>

      <Grid item className={classes.formStyle} align="center">
        <form>
          <br />
          <br />
          <TextField
            placeholder="First Name"
            name="name"
            value={nameInput}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            placeholder="Last Name"
            name="surname"
            value={surInput}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            placeholder="Email"
            name="email"
            value={emailInput}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            placeholder="Password"
            name="password"
            type="password"
            value={passwordInput}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <br />
          <label>
            <Typography variant="body1">
              <Checkbox
                value="checkedA"
                inputProps={{ "aria-label": "Checkbox A" }}
                name="terms"
                onChange={(event) => {
                  setTerms(event.target.checked);
                }}
              />
              Agree to the terms and conditions
            </Typography>
          </label>
          <br />
          <br />
          <Button onClick={onSubmit}>Sign Up</Button>
        </form>
        <br />
      </Grid>
    </Grid>
  );
}
