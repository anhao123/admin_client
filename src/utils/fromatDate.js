export default function format(time) {
    if(!time){
        return ""
    }else{
        const seconds=time.getSeconds()<10?`0${time.getSeconds()}`:time.getSeconds()
        const hours=time.getHours()<10?`0${time.getHours()}`:time.getHours()
        const minutes=time.getMinutes()<10?`0${time.getMinutes()}`:time.getMinutes()

        return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+hours+":"+minutes+":"+seconds
    }
}