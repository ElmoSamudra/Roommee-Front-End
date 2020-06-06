import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import { Typography, makeStyles, Box } from "@material-ui/core";

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
    <div className={classes.body}>
      {/* <Typography variant="h3">Chat List</Typography> */}
      <Box>
        {chatRooms.length === 0 ? (
          <Box>
            <Typography>You don't have any chat</Typography>
          </Box>
        ) : (
          chatRooms.map((room) => (
            <Box>
                <p>{room.nameUsers[0]}</p>
              
              <Link to={`/chat?name=${name}&room=${room.roomName}`}>
                <button type="submit">Go Chat!</button>
              </Link>
            </Box>
          ))
        )}
      </Box>
      {/* <div><input placeholder="name" type="text" onChange={(event) => setName(event.target.value)} /></div>
      <div><input placeholder="room" type="text" onChange={(event) => setRoom(event.target.value)} /></div> */}
    </div>
  );
}

export default Chatlist;
