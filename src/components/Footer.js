import React from 'react';
import {Typography, Grid, makeStyles } from '@material-ui/core';
import houseArt1 from '../lineart3.png'
import roommeeLogo from '../roommeelogo.png'

const useStyles = makeStyles((theme) => ({
    topPic: {
        height: "150px",
        backgroundImage: `url(${houseArt1})`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat-x",
        backgroundColor: "#f9eadf"
    },
    headingStyle: {
        backgroundColor: "#e6a469",
        paddingLeft: "27px"
    },
    linkGridStyle: {
        backgroundColor: "#db7c27",
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
                        Terms
                    </Typography>
                </Grid>
                <Grid className={classes.linkTextStyle}>
                    <Typography variant='body1'>
                        Settings
                    </Typography>
                </Grid>
                <Grid className={classes.linkTextStyle}>
                    <Typography variant='body1'>
                        Help
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};