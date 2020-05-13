import React, { useState } from 'react';
import { logIn } from "../api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, makeStyles, Grid} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel';

const frontImage = '../../images/frontphoto.png'

const useStyles = makeStyles((theme) => ({
    entireGrid:{
        backgroundColor: "#f9eadf"
    },
    formStyle:{
        padding: "10% 10% 10% 10%"
    },
    text: {
        align: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    frontImage: {
        backgroundImage: `url(${frontImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: '50%',
        backgroundBlendMode: "lighten",
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

        <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.frontImage}
        >  
            <Grid>
                <Typography variant="h1" align="center">
                    Nice to see you
                    <br />
                    <Button href="/register" variant="outlined">
                        Register Now
                    </Button>
                </Typography>    
            </Grid> 
            
            <Grid container direction="row" justify="space-evenly" 
            alignItems="center" className={classes.main}>
                
                <Grid>
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
                </Grid>
            
                <Grid className={classes.formStyle}>
                    <FormLabel align="center">
                        <br/>
                        <br/>                    
                        <TextField
                            id="filled-basic" variant="filled"
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
                            id="filled-basic" variant="filled"
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
                        <Button variant="outlined" onClick={onSubmit}>
                            Login
                        </Button>
                    </FormLabel>
                    <br/>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default FrontPage;