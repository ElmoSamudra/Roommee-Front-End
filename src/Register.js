import React, { useState } from 'react';
import { signUp } from "./api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, Checkbox, makeStyles, Grid} from '@material-ui/core';
import { Typography, Paper, Box } from '@material-ui/core'
import houseArt1 from './lineart.png'

const useStyles = makeStyles((theme) => ({
    entireGrid:{
        backgroundColor: "#e7f3ff"
    },
    welcomeStyle:{
        backgroundColor: "#cde6ff",
    },
    formStyle:{
        backgroundColor: "#80c0ff"
    },
    text: {
        width:'50%',
        padding: '10px',
        align: 'center'
    },
    bottomPic:{
        height: "50px",
        backgroundImage: `url(${houseArt1})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat-x",
    }
}));

function Register(details){

    const { name, surname, email, password, terms} = details;
    const classes = useStyles();

    let history = useHistory();

    const [nameInput, setFirstName] = useState(name);
    const [surInput, setLastName] = useState(surname);
    const [emailInput, setEmail] = useState(email);
    const [passwordInput, setPassword] = useState(password);
    const [termsInput, setTerms] = useState(terms);

    async function onSubmit(e) {
        e.preventDefault()
        let result = await signUp({
            name: nameInput,
            surname: surInput,
            email: emailInput,
            password: passwordInput,
            terms: termsInput
        });

        if(result.status === 201){
            history.push("/testkitchen")
        }
        else if(result.status === 0){
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
        else if(result.status === 1){
            toast.info('😿 We cannot continue without you agreeing to our Terms and Conditions!', {
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
        else{
            console.log('ERORR')
            toast.info('🙀 This email address has been used!', {
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
        <Grid container direction="column" justify="center"
        alignItems="stretch" className={classes.entireGrid}>
            
            <Grid>
                <br/>
                <Box border={0} borderBottom={3} borderRadius={5} className={classes.welcomeStyle}>
                    <Typography variant="h1" align="center">
                        Welcome!
                    </Typography>
                </Box>
            </Grid>

            <Grid container direction="row" justify="center" 
            alignItems="stretch" className={classes.main}>
                <Grid>
                    <Paper className={classes.text}>
                        <Typography variant='h1'>
                            Register Yourself
                        </Typography>
                        <br/>
                        <Typography variant='subtitle1'>
                            Before connecting with other wonderful roommees, <br />
                            help us to know more about you first!
                        </Typography>
                    </Paper>
                </Grid>
            
                <Grid>
                    <br />
                    <br />
                    <form>
                        <TextField
                            placeholder="First Name"
                            name="name"
                            value={nameInput}
                            onChange={event => {
                                setFirstName(event.target.value);
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            placeholder="Last Name"
                            name="surname"
                            value={surInput}
                            onChange={event => {
                                setLastName(event.target.value);
                            }}
                        />
                        <br />
                        <br />
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
                        <label>
                            {/* <input
                                type="checkbox"
                                name="terms"
                                onChange={event => {
                                    setTerms(event.target.checked);
                                }}
                            /> */}
                            <Typography variant='body1'>
                                <Checkbox
                                    value="checkedA"
                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                    name="terms"
                                    onChange={event => {
                                        setTerms(event.target.checked);
                                    }}
                                />
                                Agree to the terms and conditions 
                            </Typography>
                        </label>
                        <br />
                        <br />
                        <Button onClick={onSubmit}>
                            Sign Up
                        </Button>
                    </form>
                    <br/>
                </Grid>
            </Grid>

            <Grid className={classes.bottomPic}/>
        </Grid>
    )
}
export default Register;