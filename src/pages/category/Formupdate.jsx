import React,{Component} from "react";
import { Form, Input, } from "antd"
import PropTypes from "prop-types"

const Item=Form.Item


export default class FormUpdata extends Component{
    formRef = React.createRef();
    static propTypes={
        categoryName:PropTypes.string.isRequired,
        getname:PropTypes.func.isRequired
    }


    componentDidMount() {
        this.props.getname(this.formRef.current)
    }
    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    }

    render(){
        const categoryName=this.props.categoryName
        return(
            <Form
                ref={this.formRef}
            >
                <Item
                      name="categoryName"
                      initialValue={categoryName}
                      rules={[
                          {
                              required: true,
                              message: 'Please input your username!',
                          },
                      ]}>
                    <Input placeholder="修改分类"/>
                </Item>
            </Form>
        )
    }
}