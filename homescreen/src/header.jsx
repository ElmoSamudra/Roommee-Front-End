import React from 'react'
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    },
    buttonStyles: {
        background: 'white',
        color: "#FCDB87",

        fontWeight: 'bold',
        fontSize: 'large'
    },
    appBarStyles: {
        background: '#FCDB87'
    }
}));

const Header = () => {
    const classes = useStyles();
    return <AppBar position='static' className= {classes.appBarStyles}>
        <Toolbar >
            <Typography className= {classes.typographyStyles}>

            </Typography>
            <Button variant='contained' className= {classes.buttonStyles} href = 'https://google.com'>Logout</Button>
        </Toolbar>
    </AppBar>
};

export default Header;