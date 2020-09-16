import React, {Component} from "react";
import { Menu } from 'antd';
import {Link} from "react-router-dom"

import './index.less';
import logo from "../../assets/images/0.jpg";
import MenuList from "../../Menuconfig/menuList"

const { SubMenu } = Menu;
export default class LeftNav extends Component{

    getMenus=(menulist)=>{
        return menulist.map((item)=>{
            if(!item.children){
                return ((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))
            }else {
                return((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            this.getMenus(item.children)
                        }
                    </SubMenu>
                ))
            }

        })
    };

    render() {
        return(
            <div className="left-nav">
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>AH后台</h1>
                </header>
                <div style={{ width: "100%" }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                    >
                       {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/home">
                                首页
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to="/category">
                                分类管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            <Link to="/product">
                                商品管理
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="图表数据">
                            <Menu.Item key="5">
                                <Link to="/charts/line">
                                    折线图
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/charts/pie">
                                    饼图
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to="/charts/bar">
                                    柱状图
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="8" icon={<ContainerOutlined />}>
                            <Link to="/user">
                                用户管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9" icon={<ContainerOutlined />}>
                            <Link to="/role">
                                权限管理
                            </Link>
                        </Menu.Item>*/}
                        {
                            this.getMenus(MenuList)
                        }
                    </Menu>
                </div>
            </div>
        )
    }
}