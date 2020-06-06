import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../api/profileApi";
import Box from "@material-ui/core/Box";
import Typography from "material-ui/styles/typography";

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
  // const [room, setRoom] = useState("");

  return (
    <div>
      {/* <Typography variant="h3">Chat List</Typography> */}
      <Box>
        {chatRooms.length === 0 ? (
          <Box>
            <Typography>You don't have any chat</Typography>
          </Box>
        ) : (
          chatRooms.map((room) => (
            <Box>
              <p variant="h3">{room.nameUsers[0]}</p>
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
