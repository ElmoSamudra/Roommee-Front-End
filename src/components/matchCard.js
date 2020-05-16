import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 300,
    padding: "2%",
    marginTop: "1%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "60%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  buttonProfile: {
    margin: "auto",
    padding: "5%"
  }
  // buttonMatch{
  //     margin:"auto",
  // }
}));

const cardPic =
  process.env.PUBLIC_URL + "/images/simon-maage-tXiMrX3Gc-g-unsplash.jpg";

export default function MatchControlCard({ state }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {state === true ? (
            <Typography variant="h5">
              Try using our matching algorithm to get the right fit for your
              roommee
            </Typography>
          ) : (
            <Typography variant="h5">
              Please fill in the profile form to get started
            </Typography>
          )}
        </CardContent>
        <div className={classes.controls}>
        {state === true ? (
          <Button
            variant="contained"
            href="/matching"
            className={classes.buttonMatch}
          >
            <Typography variant="h5">Find Roommee</Typography>
          </Button>
           ) : (
            <Button
            variant="contained"
            href="/profile"
            className={classes.buttonProfile}
          >
            <Typography variant="h5"> Create Profile</Typography>
            </Button>
           )}
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={cardPic}
        title="Find your Roommee"
      />
    </Card>
  );
}
