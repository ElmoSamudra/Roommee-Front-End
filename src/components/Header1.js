import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const roommeeLogo = '../../images/roommeelogo3.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    color: "#000000"
  },
  bar: {
    background : '#FFFAFA'
  },
}));

export default function Header() {
  const classes = useStyles();

    let loginLogoutRegisterButtonText = null

    let history = useHistory();
    const page = useSelector(state => state.page);
    console.log("!!!!!!!!"+page)

    if (localStorage.getItem("token") != null){
        loginLogoutRegisterButtonText = "Logout"
    }else if (page == "register") {
        loginLogoutRegisterButtonText = "Login"
    }else if (page == "login"){
        loginLogoutRegisterButtonText = "Register"
    }else{
        loginLogoutRegisterButtonText = "Login"
    }

    function f() {
        if (loginLogoutRegisterButtonText == "Login"){
            history.push("/")

        } else if(loginLogoutRegisterButtonText == "Logout"){
            localStorage.removeItem('token')
            history.push("/")
        } else if(loginLogoutRegisterButtonText == "Register"){
            history.push("/register")
        }

    }

  return (
    <Grid 
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.root}
    >
        <AppBar elevation={0} position="static">
            <Toolbar className={classes.bar}>
                <IconButton 
                    edge="start" 
                    className={classes.homeButton}
                    aria-label="home"
                    >
                    <Link href="/">
                        <Avatar alt="Logo" src={roommeeLogo} />
                    </Link>
                </IconButton>
                <Hidden only={['xs','sm']}>
                  <Typography variant="h5" className={classes.title}>
                      Welcome
                  </Typography>
                </Hidden>
                
                <Button onClick={()=>f()}>
                    {loginLogoutRegisterButtonText}
                </Button>
            </Toolbar>
      </AppBar>
    </Grid>
  );
}