import React from "react";
import { Button } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Logo from "../images/roommeeLogo.png";

const useStyles = makeStyles(() => ({
  buttonStyles: {
    background: "#fdeab9",
    maxWidth: "600px",
    maxHeight: "75px",
    minWidth: "100px",
    minHeight: "75px",
  },
}));

const Content = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-evenly"
      style={{ minHeight: "70vh" }}
    >
      <Grid item>
        <img src={Logo} />
      </Grid>

      <Grid
        item
        container
        spacing={0}
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item>
          <Button variant="contained" className={classes.buttonStyles} href="/home">
            <Typography variant="h5">
              List Property
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className={classes.buttonStyles} href="/matching">
            <Typography variant="h5">
              Find Roommee
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {/* <Grid item>
        <Button variant="contained" className={classes.buttonStyles} href="/">
          View Matches
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default Content;
