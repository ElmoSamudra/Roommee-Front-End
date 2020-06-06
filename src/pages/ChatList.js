import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import { Typography, makeStyles, Box, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    flexGrow: 1,
  },
}));

function Chatlist() {

  const classes = useStyles();

  const { loadingProfile, userProfile, errorProfile } = useProfile();

  if (loadingProfile) {
    return <p>Loading...</p>;
  }
  if (errorProfile) {
    return <p>Something went wrong: {errorProfile.message}</p>;
  }

  const name = userProfile.firstName;
  const chatRooms = userProfile.roomList;
  console.log(chatRooms);
  // const [room, setRoom] = useState("");

  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    className={classes.body}>
      
      <Grid item xs={12}>
        <Typography variant="h3">Chat List</Typography>
      </Grid>
      <Grid item xs={12}>
      <Box>
        {chatRooms.length === 0 ? (
          <Box>
            <Typography>You don't have any chat</Typography>
          </Box>
        ) : (
          chatRooms.map((room) => (
            <Box flexDirection="row" display="flex">
              <Box>
                <Typography variant="body1">
                  <li>{room.nameUsers[0]}</li>
                </Typography>
              </Box>
              
              <Box>
                <Link to={`/chat?name=${name}&room=${room.roomName}`}>
                  <Button type="submit">Go Chat!</Button>
                </Link>
              </Box>
            </Box>
          ))
        )}
      </Box>
      </Grid>
      {/* <div><input placeholder="name" type="text" onChange={(event) => setName(event.target.value)} /></div>
      <div><input placeholder="room" type="text" onChange={(event) => setRoom(event.target.value)} /></div> */}
    </Grid>
  );
}

export default Chatlist;
