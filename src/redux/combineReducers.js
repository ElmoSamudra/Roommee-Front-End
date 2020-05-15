import currentPageReducer from "./currentPageReducer";
import {combineReducers} from "redux";

const allReducers  = combineReducers({
    page: currentPageReducer
});

export default allReducers