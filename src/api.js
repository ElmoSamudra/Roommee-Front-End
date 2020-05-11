import React from "react";

const BASE_URL ='http://localhost:3000'

export function signUp(details) {

    const { name, surname, email, password, terms } = details;

    if (!name || !surname || !email || !password) {
        return { status: 0 };
    }

    if(!terms){
        return { status: 1 };
    }

    const endpoint = BASE_URL + `/account-management/registerAccount`;
    console.log("user registering");
    console.log(details)
    return fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password
        })
    })
    .then(res => {
        console.log(res);
        return res;
    })
};