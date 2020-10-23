import React, { Component } from "react";
import { Card, Button, Table, Modal} from 'antd';
import { PlusOutlined , RightOutlined} from "@ant-design/icons";
import { connect } from "react-redux"
import { request_category, request_addCategory, request_updateCategory,body_BackCategory } from "../../redux/actions"

import LinkButton from "../../components/linkButton";
import FormData from "./Formdate";
import FormUpdata from "./Formupdate"

class Category extends Component{

    state={
        loading:false,
        parentId:'0',
        categoryId:'',
        categoryName:'',
        secondname:'一级分类',
        showModal:0
    }

    componentWillMount() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                width:830
            },
            {
                title: '操作',
                render:(category)=>
                    <span>
                        <LinkButton onclick={()=>{this.showUpdate(category)}}>
                            修改分类
                        </LinkButton>
                        {this.state.parentId==='0' ?
                                     <LinkButton onclick={()=>{this.getSecondCategory(category)}}>查看子类</LinkButton>
                            : null}

                    </span>
            },

        ];
    }
    componentDidMount() {
        // this.setState({loading:true})
         this.props.request_category("0")
    }

/*获取二级分类列表
* */
    getSecondCategory=(category)=>{
            const {_id,name} =category
          this.setState({parentId:_id,secondname:name},()=>{
              this.props.request_category(_id)
          })
    }
/*从二级分类列表 回到一级分类
  * */
    goBackCategory=()=>{
        this.setState({parentId:'0',secondname:'一级分类'},()=>{
            this.props.request_category(this.state.parentId)
        })
        this.props.body_BackCategory()
    }
 /*
* 关闭添加、修改 分类的 modal*/
    handleCancel=()=>{
        // this.form.resetFields()
        this.setState({showModal:0})
    }
    showUpdate=(category)=>{
        const {name,_id} =category
        this.setState({categoryId:_id,showModal:2,categoryName:name})
    }
    showAdd=()=>{
        this.setState({showModal:1})
    }
 /*成功 添加、修改 分类  后的处理
  * */
    handleUpdata=()=>{
    const {categoryId,parentId}=this.state
        //获取modal 中修改的值
       const categoryName= this.form.getFieldValue('categoryName')
        //清除 显示form中的默认值
        // this.form.resetFields()
        //发送 更新请求
        console.log(categoryName)
        this.props.request_updateCategory(categoryName,categoryId)
        this.props.request_category(parentId)
        this.setState({showModal:0})
    }
    handleAdd=()=>{
        /* 收集数据
        parentId,categoryName*/
        const parentId1=this.state.parentId
        const secondname=this.state.secondname
       const {parentId,categoryName}=this.formdata.getFieldsValue(["parentId","categoryName"])
        //请求更新 数据
        console.log(parentId,categoryName)
        this.formdata.setFieldsValue({categoryName:''})
        if(parentId==='一级分类'){//添加一级分类
            this.props.request_addCategory('0',categoryName);
            if(parentId1==='0'){
                this.props.request_category(parentId1)
            }
        }else{//添加二级分类
           const Item= this.props.category.categories.find(item=>(parentId===item.name))
            if(Item){
                this.props.request_addCategory(Item._id,categoryName);
                if(parentId1 !=='0' && parentId===secondname){
                    this.props.request_category(Item._id)
                }
            }
        }
        //关闭modal
        this.setState({showModal:0})
    }
    render() {
        const  {loading,parentId,categoryName,showModal,secondname}=this.state
        const {categories,secondCategory}=this.props.category
        const title= parentId==='0' ? "一级分类列表":(
            <span>
                <LinkButton onclick={this.goBackCategory}>一级分类列表</LinkButton>
                <RightOutlined /> &nbsp;&nbsp;
                <span>{secondname}</span>
            </span>
        );
        const more=(<Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>
            添加
        </Button>);
        return(
            <Card title={title} extra={more}>
                <Table
                    bordered
                    loading={loading}
                    dataSource={parentId==='0' ? categories : secondCategory}
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title="添加分类"
                    visible={showModal===1}
                    onOk={this.handleAdd}
                    onCancel={this.handleCancel}
                >
                    <FormData categoryName={secondname} getform={(form)=>{this.formdata=form}}/>
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showModal===2}
                    onOk={this.handleUpdata}
                    onCancel={this.handleCancel}
                >
                    <p>修改分类</p>
                    <FormUpdata categoryName={categoryName} getname={(from)=>{this.form=from}}/>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state=>({ category:state.body_category }),{
        request_category,request_addCategory,request_updateCategory,body_BackCategory
    })(Category)