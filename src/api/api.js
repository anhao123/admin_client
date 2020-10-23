
import Ajax from "./Ajax";
import jsonp from "jsonp"

//登录
export const login=(user)=> Ajax('/login',"post",user) ;

//jsonp 请求天气 使用 jsonp跨域
export const whether=(city)=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            {},(err,data)=>{
                if(!err){
                    resolve(data)
                }
            }
            )
    })
}
// 请求 获取 商品信息列表
export const getCategory=(parentId)=> Ajax('/manage/category/list', "get",{parentId});
// 请求 更新 商品信息列表
export const updateCategory=(categoryName,categoryId)=> Ajax('/manage/category/update',"post",{categoryName,categoryId})
// 请求 添加 商品信息列表
export const addCategory=(parentId,categoryName)=> Ajax('/manage/category/add',"post",{parentId,categoryName})
