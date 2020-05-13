import React, { useState } from 'react';
import { logIn } from "../api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, makeStyles, Grid} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    entireGrid:{
        backgroundColor: "#f9eadf"
    },
    formStyle:{
        width: "50%",
    },
    text: {
        align: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
}));

function FrontPage(details){

    const { email, password } = details;
    const classes = useStyles();

    let history = useHistory();

    const [emailInput, setEmail] = useState(email);
    const [passwordInput, setPassword] = useState(password);

    async function onSubmit(e) {
        e.preventDefault()
        let result = await logIn({
            email: emailInput,
            password: passwordInput,
        });

        if(result.status === 200){
            history.push("/testkitchen")
        }
        else {
            toast.info('😺 Please input all fields correctly!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            });
        }
    }
    
    return (
        <Grid container direction="row" justify="space-evenly" 
        alignItems="center" className={classes.main}>
            <Grid>
                <Paper className={classes.text} elevation={0}>
                    <Typography variant='h1'>
                        Login
                    </Typography>
                    <Typography variant='h2'>
                        Now
                    </Typography>
                    <br/>
                    <Typography variant='body1'>
                        Welcome Back!
                    </Typography>
                    <br/>
                    <br/>
                </Paper>
            </Grid>
        
            <Grid className={classes.formStyle}>
                <form align="center">
                    <br/>
                    <br/>                    
                    <TextField
                        placeholder="Email"
                        name="email"
                        value={emailInput}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        placeholder="Password"
                        name="password"
                        value={passwordInput}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    <br />                    
                    <br />
                    <br />
                    <Button onClick={onSubmit}>
                        Login
                    </Button>
                </form>
                <br/>
            </Grid>
        </Grid>
    )
}
export default FrontPage;