import React,{Component, Fragment} from 'react';
//样式
import './Index.scss'
//ANTD
import {validate_password} from '../../utils/validate'
import { Form, Input, Button, Row,Col} from 'antd';
import { UserOutlined, LockOutlined ,UnlockOutlined} from '@ant-design/icons';

class RegisterForm extends Component{
    constructor(){
        super();
        this.state = {};
        
    };
    onFinish(){
        alert(11);
    }
    toggleForm = () => {
        this.props.switchForm("login");
        alert("切换为登录界面");
    }
    render(){
        return(
            <Fragment>
                <div className = "form-head">
                    <h4 className="column">注册</h4>
                    <span onClick = {this.toggleForm}>账号登录</span>
                </div> 
                <div className = "form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={()=>this.onFinish}
                    >
                    <Form.Item name="username" rules={[{ required: true, message: '邮箱不能为空' },
                                                        {type:"email",message:"邮箱格式不正确"}]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' },
                                                    { pattern:validate_password, message:"请输入字母+数字，大于6位小于20位"}]}>
                        <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="passwords" rules={[{ required: true, message: 'Please input your Password again!' },
                                                    { pattern:validate_password, message:"请输入字母+数字，大于6位小于20位"}]}>
                        <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' },
                                                    {len:6,message:"请输入长度为6位的验证码"}]}>
                        <Row gutter={13}>
                            <Col span={16}>
                                <Input prefix={<UnlockOutlined  className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={8}>
                                <Button type="danger" block>
                                    获取验证码
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"  block>注册</Button>    
                    </Form.Item>
                    </Form> 
                </div>
            </Fragment>     
        )        
    }
}

export default RegisterForm;