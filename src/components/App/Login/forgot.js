import React, {Component} from 'react';
import {Form,AutoComplete, Input,Select, Row, Col,Button } from 'antd';
   
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

 

class Forgot extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
    
  
    
     
    
      
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 5,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
      
        return(
 
    <Row gutter={24}>
        <Col span={24}>
            
            <br/>
            <br/>
            <br/>
            <br/>
            <Col span={8}></Col>
            <Col span={8}>
<p> Find Your Account</p>
</Col>
<Col span={24}>
<Col span={8}></Col>
<Col span={8}>
    <p>Please enter your email address to search for your account.</p>
</Col>
</Col>
</Col>

<Col span={24}>
            <Col span={8}>
                </Col>
        <Col span={6}>
        <Form.Item label="E-mail">
           {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Send verification Code 
        </Button>
        </Col>
        </Col>
    </Row>
    );
  }
}
export default Form.create()(Forgot);