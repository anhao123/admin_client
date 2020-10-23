
import {combineReducers} from "redux"
import {LOGIN_ERROR, LOGIN_SUCCESS, HEADER_wHETHER, BODY_CATEGORY,BODY_SECONDCATEGORY,BODY_BACKCATEGORY} from "./types";

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
//天气
const default_weather={
    dayPictureUrl:'',
    weather:''
}
function header_weather(state=default_weather,action) {
    switch(action.type) {
        case HEADER_wHETHER:
            return {...action.data};
        default:
            return state;
    }
}
//商品信息
const default_category={
    categories:[],
    secondCategory:[],
}
function body_category(state=default_category,action) {
    switch(action.type) {
        case BODY_CATEGORY:
            return {...state,categories: action.data};
        case BODY_SECONDCATEGORY:
            return {...state,secondCategory: action.data};
        case BODY_BACKCATEGORY:
            return {...state,secondCategory: action.data};
        default:
            return state;
    }
}



export default combineReducers({login_user, header_weather, body_category})