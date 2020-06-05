import React from 'react';
import { Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    messageBox: {
        background: "#F3F3F3",
        borderRadius: "20px",
        padding: "5px 20px",
        color: "white",
        display: "inlineBlock",
        maxWidth: "80%",
    },
    messageContainer: {
        display: "flex",
        justifyContent: "flexEnd",
        padding: "0 5%",
        marginTop: "3px",
    },
    messageContainerUser: {
        display: "flex",
        justifyContent: "flexEnd",
        padding: "0 5%",
        marginTop: "3px",
    },
}));
const Message = ({message: {user, text}, name}) => {

    const classes = useStyles();

    let sentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        sentByCurrentUser = true;
    }

    return(
        sentByCurrentUser
            ?(
                <div className={classes.messageContainerUser}>
                    <Typography variant="body1">{trimmedName}</Typography>
                    <div className={classes.messageBox}>
                        <Typography variant="body1">{text}</Typography>
                    </div>
                </div>
            )
            :(
                <div className={classes.messageContainer}>
                    <Typography variant="body1">{user}</Typography>
                    <div className={classes.messageBox}>
                        <Typography variant="body1">{text}</Typography>
                    </div>
                </div>
            )
    )
}

export default Message