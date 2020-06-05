import { useState, useEffect } from "react";

const BASE_URL = "https://roommee.herokuapp.com";
// const BASE_URL = "http://localhost:3000";

// get the chat histo from backend
function getChatHisto(room) {
  const endpoint = BASE_URL + `/chats/history`;
  const token = localStorage.token;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      room,
    }),
  }).then((res) => {
    return res.json();
  });
}

// set the use state to get the chat history
export function useGetChatHisto(room) {
  const [loading, setLoading] = useState(true);
  const [chatHisto, setChatHisto] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getChatHisto(room)
      .then((histo) => {
        setChatHisto(histo);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, [room]);

  return {
    loadingHisto: loading,
    chatHisto,
    errorHisto: error,
  };
}
