
//Used for REDUX store to store state on which page user is
const currentPageReducer = (state = "unknown", action)=>{
    switch (action.type) {
        case 'REGISTER':
            return state = "register"
        case 'LOGIN':
            return state = "login"
        default: // need this for default case
            return state
    }
}

export default currentPageReducer