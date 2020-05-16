import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Typography, makeStyles, Box } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom';
import {useDispatch} from "react-redux";

import frontImage from process.env.PUBLIC_URL + '/images/frontphotoedited.png'
import logoImage from process.env.PUBLIC_URL + '/images/roommeeLogo2.png'

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
    },
    buttonStyles: {
        background: "#fdeab9",
        maxWidth: "600px",
        maxHeight: "75px",
        minWidth: "100px",
        minHeight: "75px",
    },
}));

function FrontPage(){
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);


    //Setting up REDUX to save to store what is the current page for later use in the navigation bar
    const dispatch = useDispatch()
    const setLogPage = ()=>{
        return {
            type: 'LOGIN'
        }
    }
    dispatch(setLogPage())
    
    return (
        <div>
        <Grid container spacing={2} className={classes.frontImage}>  
            <Grid item xs={12} align="center" className={classes.paddings} >
                <Box>
                    <Zoom in={checked} timeout={{enter: 1500}}>
                        <img src={logoImage} alt="logoImage"/>
                    </Zoom>
                </Box>
            </Grid>
                
            <Grid item xs={12} align="center">
                <Zoom in={checked} timeout={{enter: 1500}}>
                    <Typography variant="subtitle2" align="center">
                        Dedicated in helping everyone find their mates everyday.
                    </Typography>
                </Zoom>
                <Typography variant="h5" align="center">
                    <br/>
                </Typography>
            </Grid>
            
            <Grid item xs={6} align="center" className={classes.login}>
                <Button variant="contained" className={classes.buttonStyles} href="/home">
                <Typography variant="h5">
                    List Property
                </Typography>
                </Button>
            </Grid>

            <Grid item xs={6} align="center">
            <Button variant="contained" className={classes.buttonStyles} href="/matching">
                <Typography variant="h5">
                    Find Roommee
                </Typography>
            </Button>
            </Grid>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h1" align="center">
                Details on how to find ROOMMEE!
            </Typography>
        </Grid>
        </div>
    )
}
export default FrontPage;