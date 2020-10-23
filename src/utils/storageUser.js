

/*
* store 库  包装 localStorage web本地存储   进行存储
*git 上 搜索 store  找  marcuswestin/store.js
* */
const store=require('store')
const USER_KEY='user_key'
export default {
    saveUser(user){
        store.set(USER_KEY,user)
    },
    getUser(){
       return  store.get(USER_KEY) || {}
    },
    removeUser(){
        store.remove(USER_KEY)

    }
}