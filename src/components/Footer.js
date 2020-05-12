import React from 'react';
import {Typography, Grid, makeStyles } from '@material-ui/core';

//image urls
const lineart = '../../images/lineart.png';
const roommeeLogo = '../../images/roommeelogo.png'

const useStyles = makeStyles((theme) => ({
    topPic: {
        height: "150px",
        backgroundImage: `url(${lineart})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat-x",
    },
    headingStyle: {
        backgroundColor: "#FCDB87",
        paddingLeft: "27px"
    },
    linkGridStyle: {
        backgroundColor: "#f9eadf",
        height: "50px",
        paddingRight: "27px"
    },
    linkTextStyle: {
        paddingRight: "27px"
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="stretch"
        >
            <Grid className={classes.topPic}/>
            <Grid className={classes.headingStyle}>
                <Grid 
                    container 
                    direction="column"
                    justify="flex-end"
                    alignItems="flex-start"
                >   
                    <Grid>
                        <img src={roommeeLogo} alt="" height="75px" />
                    </Grid>
                    <Grid>
                        <Typography variant='h5'>
                            By Paradigm
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                className={classes.linkGridStyle}
            >
                <Grid className={classes.linkTextStyle}>
                    <Typography variant='body1'>
                        <a href="/">Terms</a>
                    </Typography>
                </Grid>
                <Grid className={classes.linkTextStyle}>
                    <Typography variant='body1'>
                        <a href="/">Settings</a>
                    </Typography>
                </Grid>
                <Grid className={classes.linkTextStyle}>
                    <Typography variant='body1'>
                        <a href="/">Help</a>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};