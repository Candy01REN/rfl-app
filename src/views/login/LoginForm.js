import React,{Component,Fragment} from 'react';
//样式
import './Index.scss'
//验证
import {validate_password ,validate_email} from '../../utils/validate'
//ANTD
import { Form, Input, Button,Row,Col,message} from 'antd';
import { UserOutlined, LockOutlined ,UnlockOutlined} from '@ant-design/icons';
//接口

import { Login,GetCode } from '../../api/account';

class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username:"",
            code_button_disabled: false,
            code_button_loading: false,
            code_button_text:"获取验证码",
            
        };
        //react没有数据双向绑定，v-model，要手动处理
        
    };
    //登录
    onFinish = (values)=>{
        
        Login().then(response =>{
            console.log(response);
        }).catch(error=>{

        })
    }
    //获取验证码
    getCode = ()=>{
        if(!this.state.username){
            message.warning('用户名不能为空',1);
            return false;
        }
        this.setState({
            code_button_loading:true,
            code_button_text:"发送中",
        })
        const requestData = {
            username:this.state.username,
            module:"login"
        }
        GetCode().then(response => {
            //倒计时60s
            this.countDown();
            
        }).catch(error => {
            //发送失败,重新获取
            this.setState({
                code_button_loading:false,
                code_button_text:"重新获取",
            })
        })
    }
    /**input输入处理 */
    inputChange = (e) =>{
        let value = e.target.value;
        this.setState({
            username:value
        })
        //console.log(e);
    }
    /**
     * 倒计时
     */
    countDown = () => {
        let sec = 6;
        let timer = null;
        this.setState({
            code_button_disabled:true,
            code_button_loading:false,
            code_button_text:`${sec}s`,
        })
        //定时器
        timer = setInterval(() => {
            sec--;
            this.setState({
                code_button_text:`${sec}s`
            })
            if(sec<=0){
                
                this.setState({
                    code_button_text:"重新获取",
                    code_button_disabled:false,
                })
                clearInterval(timer);
                return false;
            }
            

        }, 1000);

    }

    toggleForm = () => {
        this.props.switchForm("register");
        alert("切换为注册界面");
    }
    render(){
        const { username , code_button_disabled,code_button_loading,code_button_text} = this.state;
        const _this = this;
        return(
            <Fragment>
                <div className = "form-head">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div> 
                <div className = "form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={()=>this.onFinish}
                    >
                    <Form.Item name="username" rules={
                        [
                            { required: true, message: '邮箱不能为空!' },
                            {type:"email",message:"邮箱格式不正确"}
                            // ({getFiledValue}) => ({
                            //     validator(rule,value){
                            //         if(validate_email(value)){
                            //             _this.setState({
                            //                 code_button_disabled : false
                            //             })
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject('邮箱格式不正确')
                            //     },
                            // })
                        ]}>
                        <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            {required: true, message:"密码不能为空！"},
                            // //自定义验证
                            // ({getFieldValue})=>({//es6解构
                            //     validator(rule,value){
                            //         if(value.length < 6||value.length > 20){
                            //             return Promise.reject('不能小于六位');
                            //         }else{
                            //             return Promise.resolve();
                            //         }
                            //     },
                            // }),
                            // { required: true, message: '密码不能为空!' },
                            // { min: 6, message:"不能小于6位"},
                            // { max: 20,message:"不能大于20位"},
                            { pattern:validate_password, message:"请输入字母+数字，大于6位小于20位"}

                        ]}>
                        <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="字母+数字，大于6位小于20位" />
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '验证码不能为空' },
                                                    {len:6,message:"请输入长度为6位的验证码"}]}>
                        <Row gutter={13}>
                            <Col span={16}>
                                <Input prefix={<UnlockOutlined  className="site-form-item-icon" />} placeholder="Code" />
                            </Col>
                            <Col span={8}>
                                <Button type="danger" block  loading={code_button_loading} disabled={this.state.code_button_disabled} onClick={this.getCode}>
                                    {code_button_text}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block >登录</Button>    
                    </Form.Item>
                    </Form> 
                </div>
            </Fragment>     
        )        
    }
}

export default LoginForm;