import React, {Component} from 'react';
import {Form,AutoComplete, Input,Select, Row, Col,Button } from 'antd';
   
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

 

class Reset extends React.Component {
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
      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    
      validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
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
<p> Please Enter Your New Password</p>
</Col>

</Col>

<Col span={24}>
            <Col span={8}>
                </Col>
        <Col span={6}>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Change Password 
        </Button>
        </Col>
        </Col>
    </Row>
    );
  }
}
export default Form.create()(Reset);