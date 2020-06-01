import React, { useState } from "react";
import { Link } from 'react-router-dom'

function Chatlist() {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <div><input placeholder="name" type="text" onChange={(event) => setName(event.target.value)} /></div>
      <div><input placeholder="room" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
      <Link onChange={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button type="submit">Go to room</button>
      </Link>
    </div>
  );
}

export default Chatlist;