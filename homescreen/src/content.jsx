import React from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Logo from "../../public/images/roommeeLogo.png";

const useStyles = makeStyles(() => ({
  buttonStyles: {
    background: "#FCDB87",
    color: "white",

    fontWeight: "bold",
    fontSize: "large",
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
          <Button variant="contained" className={classes.buttonStyles} href="/">
            List Property
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className={classes.buttonStyles} href="/">
            Find Roommee
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="contained" className={classes.buttonStyles} href="/">
          View Matches
        </Button>
      </Grid>
    </Grid>
  );
};

export default Content;
