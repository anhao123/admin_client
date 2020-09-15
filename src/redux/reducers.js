
import {combineReducers} from "redux"
import {LOGIN_ERROR,LOGIN_SUCCESS} from "./types";


const default_user={
    _id: "",
    username: ""
    }
function login_user(state=default_user,action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...action.data};
        case LOGIN_ERROR:
            return {...state,msg:action.data};
        default:
            return state;
    }
}


export default combineReducers({login_user})