import React from "react";

const BASE_URL ='https://roommee.herokuapp.com'

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

export function logIn(details) {

    const { email, password } = details;

    if (!email || !password) {
        return { status: 0 };
    }

    const endpoint = BASE_URL + `/account-management/accounts/login`;
    console.log("user loging in");
    console.log(details)
    return fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
    })
    .then(res => {
        console.log(res);
        return res;
    })
};

export async function  getAccount() {

    try{
        const token = localStorage.token;
        let response = null
        if (token != null ) {

            try {
                response = await fetch(BASE_URL + "/account-management/accounts/me", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                return response

            }catch (e) {
                return null
            }

        } else {
            return null;
        }

    }catch (e) {
        console.log(e)
        return null;

    }
}