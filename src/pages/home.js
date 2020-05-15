import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import Header from "./header.jsx";
import Content from "./content";
// import Footer from "./Footer";

const useStyles = makeStyles({
  testing: {
    fontStyle: "oblique",
    color: "#FCDB87",
    fontSize: "30px",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div id="home-text">
      <h1>Welcome to Roommee</h1>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={8}>
            <Content />
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
        <Grid item>{/* <Footer /> */}</Grid>
      </Grid>
    </div>
  );
}
