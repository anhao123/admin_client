import React, {Component} from "react";
import {connect} from "react-redux"
 import { Redirect, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';

import storageUser from "../../utils/storageUser";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Role from "../role/role";
import User from "../user/user";


const { Footer, Sider, Content } = Layout;
 class Admin extends Component{

    render() {
        const { _id }=storageUser.getUser()
        if(!_id){
            return <Redirect to='/login' />
        }
        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                        {/*<button onClick={this.signOut}>退出登录</button>*/}
                    <Content style={{overflow:"auto",margin:"20px 15px 5px 15px",backgroundColor:"white"}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:"center"}}>《本产品由“疯子——小浩” 支持》</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state=>({user:state.login_user}),{

    }
)(Admin)