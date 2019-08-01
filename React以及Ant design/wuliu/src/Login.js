import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import $ from 'jquery'
import './Login.css';

class Login extends React.Component {

    handleSubmit = e => {
       
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let url = "http://localhost:8888/administrator/login";
            $.post(url,values,({data,status,message:msg})=>{
                if(status === 200){
                    message.success(msg);
                    window.localStorage.setItem("userId",data.userId);
                    window.localStorage.setItem("userName",data.username);
                    console.log("id已存在storage");
                    window.location.href = '/';  
                }else{
                    message.error(msg);
                }
            })
          }
        });
    };



    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
            <h1 className="title">欢迎登录</h1>
             <Form onSubmit={this.handleSubmit} className="form">
                 {/* {JSON.stringify(this.props)} */}
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">
                    登录
                </Button>
                {/* 禁止注册，因为管理人员的新增只能是内部人员添加 */}
                {/* <Button type="gost" block  className="register-form-button">
                    立即注册
                </Button> */}
                </Form.Item>
            </Form>
            </div>
        )
    }
}

export default (Form.create()(Login));