import React from 'react';

const Message = ({message: {user, text}, name}) => {
    let sentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        sentByCurrentUser = true;
    }

    return(
        sentByCurrentUser
            ?(
                <div>
                    <p>{trimmedName}</p>
                    <div>
                        <p>{text}</p>
                    </div>
                </div>
            )
            :(
                <div>
                    <p>{user}</p>
                    <div>
                        <p>{text}</p>
                    </div>
                </div>
            )
    )
}

export default Message