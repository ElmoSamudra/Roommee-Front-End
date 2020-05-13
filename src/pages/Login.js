import React, { useState } from 'react';
import { logIn } from "../api";
import { useHistory } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import { Button, TextField, makeStyles, Grid, Box} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel';

const frontImage = '../../images/frontphotoedited.png'
const gearImage = '../../images/gears.png'
const logoImage = '../../images/roommeeLogo2.png'

const useStyles = makeStyles((theme) => ({
    paddings:{
        paddingTop: "100px"
    },
    firstInfo:{
        paddingTop: "100px"
    },
    secondInfo:{
        paddingTop: "100px",
        backgroundColor: "#fdf8f4"
    },
    formStyle: {
        paddingBottom: "20px",
    },
    frontImage: {
        height: "100%",
        backgroundImage: `url(${frontImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSttachment: "fixed",
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

    async function onSubmit(e) {
        e.preventDefault()
        let result = await logIn({
            email: emailInput,
            password: passwordInput,
        });

        if(result.status === 200){
            history.push("/profile")
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
        <div>
        <Grid container spacing={2} className={classes.frontImage}>  
            <Grid item xs={12} align="center" className={classes.paddings} >
                <Box width="20%">
                    <img src={logoImage} alt="gearImage"/>
                    <Typography variant="subtitle2" align="center">
                        Dedicated in helping everyone find their mates everyday.
                        <br/>
                    </Typography>
                </Box>
            </Grid>
                
            <Grid item xs={12} align="center">
                <Button href="/register" variant="outlined">
                    Register Now
                </Button>
                <Typography variant="h1" align="center">
                    <br/>
                </Typography>
            </Grid>
            
            <Grid item xs={6} align="center" className={classes.login}>
                <Box width="40%">
                    <Typography variant='h2'>
                        Login Now
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={6} align="center">
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
                <Box width="50%">
                    <Typography variant='h3' align="center">
                        Intro to Roommee
                    </Typography>
                    <Typography variant='body1' align="center">
                        Here in Roommee, we are dedicated to match you 
                        with your future roommates according to your personal preferences.
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={6} align="center">
                <img src={gearImage} alt="gearImage"/>
            </Grid>
        </Grid>
        <Grid container className={classes.secondInfo}>
            <Grid item xs={6} align="center">
                <img src={gearImage} alt="gearImage"/>
            </Grid>
            <Grid item xs={6} align="center">
            <Box width="50%">
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