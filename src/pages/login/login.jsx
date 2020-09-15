import React, { Component } from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import "./login.less";
import logo from "./images/0.jpg";
import { Form, Button, Input, message } from "antd";
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { request_login } from "../../redux/actions";


class Login extends Component{
    formRef=React.createRef();
    static state={
        username:'',
        password:''
    }
   componentWillUpdate() {
        if(this.props.user.msg){
            this.props.user.msg=null
        }
   }

    onFinish=(values)=>{
        const { username, password }=values;
        this.setState({ username, password })
        this.props.request_login(this.state);
        // console.log(this.formRef.current.validateFields)
    }
    render() {
        const msg=this.props.user.msg;
        return(
            <div className="login">
                {this.props.user._id ? <Redirect to="/"/> : null}
                {msg?message.error(msg):null}
                <div className="login_head">
                    <img src={logo} alt="logo"/>
                    <div className="text">后台管理系统——安浩</div>
                </div>
                <div className="login_context">
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        initialValues={{
                            remember: true,
                        }}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    // whitespace:true,
                                    message: 'Please input your Username!',
                                },{
                                    pattern:/\w+/,
                                    whitespace:true,
                                    message:'请输入数字、字母或下划线'
                                },{
                                    min:4,
                                    message:'最少4位'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                   placeholder="Username"
                                   size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size="large"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" className="login-form-button" block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.login_user}),{
        request_login
    }
)(Login)