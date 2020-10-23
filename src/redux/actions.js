

import {LOGIN_ERROR, LOGIN_SUCCESS, HEADER_wHETHER, BODY_CATEGORY, BODY_SECONDCATEGORY,BODY_BACKCATEGORY} from "./types";
import { login, whether, getCategory, updateCategory, addCategory} from "../api/api";
import {message} from "antd";
import storageUser from "../utils/storageUser"


//登陆成功&失败
 const login_success=(userData)=> ({type:LOGIN_SUCCESS, data:userData})
 const login_error=(err_message)=>({type:LOGIN_ERROR,data:err_message})

/*天气 异步请求
* */
const header_whether=(whether)=> ({type:HEADER_wHETHER,data:whether})

/*请求商品信息
* */
const body_category=(category)=>({type:BODY_CATEGORY,data:category})
const body_secondCategory=(category)=>({type:BODY_SECONDCATEGORY,data:category})
export const body_BackCategory=()=>({type:BODY_BACKCATEGORY,data:[]})



/*登录验证 异步请求
* */
export const request_login=(user)=>{
     const {username,password}=user;
     return async dispatch=>{
             const  response=await login({username,password});
             if(response.status===0){
                 console.log(response);
                 // localStorage.setItem("user_key",JSON.stringify(response.data))
                 storageUser.saveUser(response.data);
                 dispatch(login_success(response.data));
             }else {
                 dispatch(login_error(response.msg));
                 console.log(response);
                 message.error(response.msg);
             }
     }
};

/*天气 异步请求
* */
export const request_whether=(city)=>{
    return async dispatch=>{
        const response=await whether(city)
        if(response.status==="success"){
            const weather=response.results[0].weather_data[0].weather;
            const dayPictureUrl=response.results[0].weather_data[0].dayPictureUrl;
            const date={dayPictureUrl,weather}
            dispatch(header_whether(date))
        }
    }

}

/*
* 请求查询 商品信息  category list
* */
export const request_category=(parentId)=>{

    return async dispatch=>{
        const response= await getCategory(parentId);
        if(response.status===0&& parentId==='0'){
            dispatch(body_category(response.data))
        }else if(response.status===0 && parentId !=='0'){
            dispatch(body_secondCategory(response.data))
        }
    }
}
/*
* 请求添加 商品信息  addCategory list
* */
export const request_addCategory=(parentId,categoryName)=>{
    return async dispatch=>{
        const response= await addCategory(parentId,categoryName);
        console.log(response)
    }
}
/*
* 请求更新 商品信息  updateCategory list
* */
export const request_updateCategory=(categoryName,categoryId)=>{
    return async dispatch=>{
        const response= await updateCategory(categoryName,categoryId);
        if(response.status===0){
            console.log(response)
        }
    }
}