import React, {Component} from "react";
import { Modal } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import LinkButton from "../linkButton/index"

import './index.less'
// import tu from '../../assets/images/0.jpg'
import format from "./../../utils/fromatDate"
import storage from "./../../utils/storageUser"
import menuList from "../../Menuconfig/menuList";
import {request_whether} from "../../redux/actions"

const { confirm } = Modal;

 class Header extends Component{

    state={
        date:format(new Date())
    };

    componentDidMount() {
       this.setInterId=setInterval(()=>{
          const date=format(new Date());
          this.setState({date})
        },1000)
        this.props.request_whether("郑州")
    }
    componentWillMount() {
        clearInterval(this.setInterId)
    }

     getTitle=(menuList)=>{
        const {pathname}=this.props.location;
        let title=''
        menuList.forEach(item=>{
            if(item.key===pathname){
                title=item.title
                // console.log(item.key)
            }else if(item.children){
                // console.log(item.children)
               const citem=item.children.find(citem=> //查找数组中 匹配的子项
                    citem.key===pathname)
                if(citem){
                    title=citem.title
                }
            }
        })
        return title
    }
     showConfirm=()=>{
         confirm({
             icon: <ExclamationCircleOutlined />,
             content: '确认退出',
             onOk:()=> {
                 storage.removeUser();
                 this.props.history.replace("/login")
                 // window.location.href="/login";
             },
             onCancel:()=> {
             },
         });
     }
     render() {
        const {username}=this.props.user;
        const {weather,dayPictureUrl}=this.props.weather;
        const title=this.getTitle(menuList);
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎 {username}</span>
                    {/*<Space>
                        <Button onClick={this.showConfirm} size="small">
                            退出
                        </Button>
                    </Space>*/}
                    <LinkButton onclick={this.showConfirm}>
                        退出
                    </LinkButton>
                    {/*<Button type="primary" size="small" onClick={()=>{storage.removeUser();window.location.href="/login"}}>
                        退出
                    </Button>*/}
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{weather}</span>
                        <img src={dayPictureUrl} alt="aa"/>
                        <span>{this.state.date}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(connect(state=>({
     user:state.login_user,weather:state.header_weather
}),{ request_whether}
)(Header))