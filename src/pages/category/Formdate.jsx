import React,{Component} from "react";
import { Form, Input, Select } from "antd"
import PropTypes from "prop-types"
import {connect} from "react-redux"

const Item=Form.Item
const Option=Select.Option

 class FormData extends Component{

    formRef = React.createRef();
    static propTypes={
        getform:PropTypes.func.isRequired,
        categoryName:PropTypes.string.isRequired
    }
    componentDidMount() {
        this.props.getform(this.formRef.current)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.formRef.current.setFieldsValue({
            parentId: this.props.categoryName,
        });
    }

    render(){
        return(
            <Form
             ref={this.formRef}
            >
                <span>分类</span>
                <Item
                    name="parentId"
                    initialValue='一级分类'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Select>
                        <Option value='一级分类'>一级分类</Option>
                        {/*<Option value='1'>1111</Option>
                        <Option value='2'>2222</Option>*/}
                        {
                            this.props.category.map(item=>(
                                <Option key={item._id} value={item.name}>{item.name}</Option>
                            ))
                        }
                    </Select>
                </Item>
                <span>名称</span>
                <Item
                      name="categoryName"
                      rules={[
                          {
                              required: true,
                              message: 'Please input your username!',
                          },
                      ]}>
                    <Input placeholder="名称"/>
                </Item>
            </Form>
        )
    }
}

export default connect(state=>({
    category:state.body_category.categories
}),{})(FormData)