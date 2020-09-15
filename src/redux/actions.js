

import {LOGIN_ERROR, LOGIN_SUCCESS} from "./types";
import {login} from "../api/api";


//登陆成功&失败
 const login_success=(userData)=> ({type:LOGIN_SUCCESS, data:userData})
 const login_error=(err_message)=>({type:LOGIN_ERROR,data:err_message})



/*登录验证 异步请求
* */
export const request_login=(user)=>{

     const {username,password}=user;
     return async dispatch=>{
             const  response=await login({username,password});
             if(response.data.status===0){
                 console.log(response.data)
                 dispatch(login_success(response.data.data))
             }else {
                  console.log(response)
                 dispatch(login_error(response.data.msg))
             }
     }
}