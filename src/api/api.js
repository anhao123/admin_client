
import Ajax from "./Ajax";

//登录
export const login=(user)=> Ajax('/login',"post",user) ;
