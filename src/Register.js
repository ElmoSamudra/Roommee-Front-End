import React, { useState } from 'react';
import { signUp } from "./api";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField, Checkbox, makeStyles, Grid} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core'
import image from './livingroome.png'

const useStyles = makeStyles((theme) => ({
    text: {
        width:'50%',
        padding: '10px',
        align: 'center'
    },
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
            toast.error('🦄 please input all boxes', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(result.status === 1){
            toast.error('🦄 Please agree to the Terms and Conditions', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            console.log('ERORR')
            toast.error('🦄 Email already included!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    
    return (
        <Grid container direction="row" justify="center" 
        alignItems="stretch" className={classes.main}>
            <Grid m={1}>
                <br />
                <br />
                <br />
                <Paper className={classes.text}>
                    <Typography variant='h1'>
                        Register Yourself
                    </Typography>
                    <br/>
                    <Typography variant='body1'>
                        Before connecting with other wonderful roommees, <br />
                        help us to know more about you first!
                    </Typography>
                    <br/>
                </Paper>
            </Grid>
        
            <Grid>
                <br/>
                <br/>
                <br/>
                <br/>
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
            </Grid>
        </Grid>
    )
}
export default Register;