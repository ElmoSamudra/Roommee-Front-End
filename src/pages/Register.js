import React, { useState } from 'react';
import { signUp } from "../api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, Checkbox, makeStyles, Grid} from '@material-ui/core';
import { Typography, Box } from '@material-ui/core'
import {useDispatch} from "react-redux";


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

function Register(details){

    const { name, surname, email, password, terms} = details;
    const classes = useStyles();

    let history = useHistory();

    //Setting up current page in the REDUX for later use in nav bar
    const setLogPage = ()=>{
        return {
            type: 'REGISTER'
        }
    }
    const dispatch = useDispatch()
    dispatch(setLogPage())

    const [nameInput, setFirstName] = useState(name);
    const [surInput, setLastName] = useState(surname);
    const [emailInput, setEmail] = useState(email);
    const [passwordInput, setPassword] = useState(password);
    const [termsInput, setTerms] = useState(terms);

    async function onSubmit(e) {
        e.preventDefault()

        try{
            let result = await signUp({
                name: nameInput,
                surname: surInput,
                email: emailInput,
                password: passwordInput,
                terms: termsInput
            });

            if(result.status === 201){
                let resultInJSON = await result.json();
                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" + resultInJSON.account)
                localStorage.setItem("token", resultInJSON.token)
                localStorage.setItem("account", resultInJSON.account)
                history.push("/myaccount")

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

        }catch (e) {
            history.push("/404")
        }

    }
    
    return (
        <Grid container alignItems="center" justify="center">
            <Grid item align="center">
                <Box className={classes.text}>
                    <Typography variant='h2'>
                        Register
                        Yourself
                    </Typography>
                    <br/>
                    <Typography variant='body1'>
                        Before connecting with other wonderful roommees, <br />
                        help us to know more about you first!
                    </Typography>
                    <br/>
                    <br/>
                </Box>
            </Grid>
        
            <Grid item className={classes.formStyle} align="center">
                <form>
                    <br/>
                    <br/>
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
    )
}
export default Register;