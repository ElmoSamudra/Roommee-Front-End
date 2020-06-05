import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../components/Message";
import {
  Button,
  Input,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useGetChatHisto } from "../api/chatApi";

let socket;

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceBetween",
    borderRadius: "8px",
    height: "60%",
    width: "40%",
  },
  messages: {
    padding: "5% 0",
    overflow: "auto",
    flex: "auto",
  },
}));

function Chat({ location }) {
  // parse the url to get the room name
  const { name, room } = queryString.parse(location.search);
  const { loadingHisto, chatHisto, errorHisto } = useGetChatHisto(room);

  // try to get the history messages first
  if (loadingHisto) {
    return <p>Loading...</p>;
  }
  if (errorHisto) {
    return <p>Something went wrong: {errorHisto.message}</p>;
  }
  console.log(chatHisto);
  const newHisto = extractHisto(chatHisto.messages);
  console.log(newHisto);
  return (
    <div>
      <ChatDiv location={location} history={newHisto} names={chatHisto.users} />
    </div>
  );
}

function ChatDiv({ location, history, names }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const messages = useRef([]);
  const [initMessage, setInitMessage] = useState(false);
  const ENDPOINT = "https://roommee.herokuapp.com";

  history.forEach((histo) => {
    messages.current.push(histo);
  });

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    console.log(socket);

    socket.emit("join", { name: name, room: room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", function (message) {
      messages.current.push(message);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  console.log(message, messages);

  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <Typography variant="h2">
          <p>{names[0] + " & " + names[1]}</p>
        </Typography>
      </div>
      <div>
        <Paper style={{ height: "400px", overflow: "auto" }}>
          <ScrollToBottom className={classes.messages}>
            {messages.current.map((message, i) => (
              <div key={i}>
                <Message message={message} name={name} />
              </div>
            ))}
          </ScrollToBottom>
        </Paper>
        <Input
          value={message}
          placeholder="message here"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <Button onClick={(event) => sendMessage(event)}>Enter</Button>
      </div>
    </div>
  );
}

// extract the chat histo to match messages
function extractHisto(histo) {
  let newHisto = [];
  histo.forEach((eachHisto) => {
    let objHisto = {};
    objHisto.user = eachHisto.from;
    objHisto.text = eachHisto.body;
    newHisto.push(objHisto);
  });
  return newHisto;
}

export default Chat;
