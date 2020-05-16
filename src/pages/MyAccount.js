import React, { useState } from 'react';
import {getAccount, logIn} from "../api/register&login";
import { withRouter } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, makeStyles, Grid} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core'
import Register from "./Register";

// const useStyles = makeStyles((theme) => ({
//     entireGrid:{
//         backgroundColor: "#f9eadf"
//     },
//     formStyle:{
//         width: "50%",
//     },
//     text: {
//         align: 'center',
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//     }
// }));



class AccountCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            account: null,
        };

    }


    async getAccount() {

        try{

            let result = await getAccount();
            if (false){
                this.props.history.push("/")
            }
            else if (result.status != 401){
                console.log(result)
                let resultJSON = await result.json()
                console.log("REceived*****: " + resultJSON.name)
                console.log(resultJSON.message)
                this.setState({ account: resultJSON, isLoaded: true })

            }else if (result.status == 401){
                console.log("error 401")
                localStorage.removeItem("token")
                this.props.history.push("/")
            }
        }catch (e) {
            console.log("Caught error" + e.message)
        }

    }

    componentDidMount() {
        this.getAccount()
    }

    render() {
        const { match, location, history } = this.props;
        console.log(match)
        console.log(location)
        console.log(history)
        if (this.state.isLoaded){
            return(
                <div>
                    <h1>{this.state.account.name}</h1>
                    <h1>{this.state.account.surname}</h1>

                </div>)
        }else {

            return null
        }



    }

}

export default withRouter(AccountCard)