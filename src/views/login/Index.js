import React,{Component} from 'react';
import "./Index.scss"
//ANTD
//import { Form, Input, Button,Row,Col} from 'antd';
//import { UserOutlined, LockOutlined ,UnlockOutlined} from '@ant-design/icons';
//真正的组件
import LoginForm from './LoginForm';
import ResisterForm from './RegisterForm';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            formType:'login'
        };
        //this.onFinish = this.onFinish.bind(this);
    };
    onFinish = (value) => {
        alert(111);
    }
    switchForm = (value) => {
        this.setState({
            formType:value
        })
    }
    render(){
        return(
            <div className="form-wrap">   
                <div>
                    {this.state.formType === 'login' ? 
                    <LoginForm switchForm = {this.switchForm}></LoginForm> :
                    <ResisterForm switchForm = {this.switchForm}></ResisterForm>}
                </div>
            </div>
                
            

        )        
    }
}

export default Login;