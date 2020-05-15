import React, { useState } from 'react';
import { logIn } from "../api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, Grid, TextField } from '@material-ui/core';
import { Typography, makeStyles, Box } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel';
import Hidden from '@material-ui/core/Hidden';
import Zoom from '@material-ui/core/Zoom';
import {useDispatch} from "react-redux";

const frontImage = '../../images/frontphotoedited.png'
const humanImage = '../../images/human.png'
const gearImage = '../../images/gears.png'
const logoImage = '../../images/roommeeLogo2.png'

const useStyles = makeStyles((theme) => ({
    paddings:{
        paddingTop: "100px"
    },
    firstInfo:{
        paddingTop: "15px"
    }, 
    secondInfo:{
        paddingTop: "15px",
        backgroundColor: "#fdf8f4"
    },
    formStyle: {
        paddingBottom: "20px",
    },
    frontImage: {
        height: "100%",
        backgroundImage: `url(${frontImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "auto",
        backgroundPositionY: "10px",
        paddingBottom: "50px"
    },
    login: {
        borderRight: "solid",
        borderWidth: "0.25px",
    }
}));

function FrontPage(details){

    const { email, password } = details;
    const classes = useStyles();

    let history = useHistory();

    const [emailInput, setEmail] = useState(email);
    const [passwordInput, setPassword] = useState(password);

    const [checked, setChecked] = React.useState(true);


    //Setting up REDUX to save to store what is the current page for later use in the navigation bar
    const dispatch = useDispatch()
    const setLogPage = ()=>{
        return {
            type: 'LOGIN'
        }
    }
    dispatch(setLogPage())

    async function onSubmit(e) {
        e.preventDefault()
        try{


            let result = await logIn({
                email: emailInput,
                password: passwordInput,
            });

            if (result){

                if(result.status === 200){
                    let resultInJSON = await result.json();
                    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" + resultInJSON.account)
                    localStorage.setItem("token", resultInJSON.token)
                    localStorage.setItem("account", resultInJSON.account)
                    history.push("/home")
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

            }else {
                history.push("/404")
            }

        }catch (e) {
            history.push("/404")
        }
    }
    
    return (
        <div>
        <Grid container spacing={2} className={classes.frontImage}>  
            <Grid item xs={12} align="center" className={classes.paddings} >
                <Box>
                    <Zoom in={checked} timeout={{enter: 1500}}>
                        <img src={logoImage} alt="logoImage"/>
                    </Zoom>
                    <Typography variant="subtitle2" align="center">
                        Dedicated in helping everyone find their mates everyday.
                        <br/>
                    </Typography>
                </Box>
            </Grid>
                
            <Grid item xs={12} align="center">
                <Zoom in={checked} timeout={{enter: 1500}}>
                    <Button href="/register" variant="outlined">
                        Register Now
                    </Button>
                </Zoom>
                <Typography variant="h5" align="center">
                    <br/>
                </Typography>
            </Grid>
            
            <Grid item xs={6} align="center" className={classes.login}>
                <Box>
                    <Typography variant='h3'>
                        Match with your future roommates with Roommee.
                    </Typography>
                    <Typography variant='h5'>
                        <br/>
                        Personalised matching<br/>
                        Find housing together with your mate in app<br/>
                        Connecting you to your favourite utilities
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={6} align="center">
                <Typography variant='h3' className={classes.formStyle}>
                    Welcome Back
                </Typography>
                <FormLabel>
                    <Box className={classes.formStyle}>
                        <TextField
                            id="filled-basic" variant="filled"
                            placeholder="Email"
                            name="email"
                            value={emailInput}
                            onChange={event => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Box>            
                    <Box className={classes.formStyle}>
                        <TextField
                            id="filled-basic" variant="filled"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={passwordInput}
                            onChange={event => {
                                setPassword(event.target.value);
                            }}
                        />
                    </Box>
                    <Box className={classes.formStyle}>
                        <Button variant="outlined" onClick={onSubmit}>
                            Login
                        </Button>
                    </Box>
                </FormLabel>
            </Grid>
        </Grid>
        <Grid container className={classes.firstInfo}>
            <Grid item xs={6} align="center">
                <Box>
                    <Typography variant='h3' align="center">
                        Intro to Roommee
                    </Typography>
                    <Typography variant='body1' align="center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nulla lobortis ultricies diam. Pellentesque habitant morbi 
                        tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Proin malesuada viverra nunc eu interdum.
                    </Typography>
                </Box>
            </Grid>
            <Hidden only={['xs','sm']}>
                <Grid item xs={6} align="center">
                    <img src={humanImage} alt="humanImage"/>
                </Grid>
            </Hidden>
        </Grid>
        <Grid container className={classes.secondInfo}>
            <Hidden only={['xs','sm']}>
                <Grid item xs={6} align="center">
                    <img src={gearImage} alt="gearImage"/>
                </Grid>
            </Hidden>
            <Grid item xs={6} align="center">
            <Box>
                    <Typography variant='h3' align="center">
                        Header
                    </Typography>
                    <Typography variant='body1' align="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nulla lobortis ultricies diam. Pellentesque habitant morbi 
                    tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Proin malesuada viverra nunc eu interdum. 
                    In mollis tortor eget blandit fermentum. 
                    Nunc in mi pellentesque, eleifend ligula nec, lacinia neque. 
                    Cras sed faucibus eros. 
                    Sed eget nulla mollis, sodales nisi non, placerat lorem. 
                    Nullam eros felis, cursus sit amet orci in, dignissim tempus felis.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
        </div>
    )
}
export default FrontPage;