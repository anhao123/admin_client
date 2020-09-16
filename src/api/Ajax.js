

/*
* 处理请求出错的信息  在外层包一个promise
*
* */
/*
import Axios from "axios"
export default function ajax(url,type="get",data={}) {
           if(type==="get"){
            return Axios.get(url,{
             params:data
            })
           }else if(type==="post"){
            return Axios.post(url,data)
           }

 }*/

import Axios from "axios"
import {message} from "antd";

export default function ajax(url,type="get",data={}) {

    return new Promise((resolve,reject)=>{
         let promise
        if(type==="get"){
            promise=Axios.get(url,{
                params:data
            })
        }else if(type==="post"){
             promise=Axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(err=>{
            message.info(err.message)
        })
    })

}
