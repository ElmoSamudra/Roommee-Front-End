import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import Box from "@material-ui/core/Box";
import Typography from "material-ui/styles/typography";
import { Button } from "@material-ui/core";

function Chatlist() {
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

  return (
    <div>
      <Typography variant="h2">Chat List</Typography>
      <Box>
        {chatRooms.length === 0 ? (
          <Box>
            <Typography variant="h3">You don't have any chat :(</Typography>
          </Box>
        ) : (
          chatRooms.map((room) => (
            <Box>
              <Typography variant="h3">
                <p>{room.nameUsers[0]}</p>
              </Typography>
              <Link to={`/chat?name=${name}&room=${room.roomName}`}>
                <Button type="submit">Go Chat!</Button>
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
