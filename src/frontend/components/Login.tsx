import * as React from 'react';

import { Card, Form, Icon, Input, Button, message } from 'antd';

import { LoginStyle } from './LoginStyle.style';
import axios from 'axios';

const FormItem = Form.Item;

export interface LoginState {
    isLoginEnable: boolean,
    error: string,
}

class Login extends React.Component<{} & any, LoginState & any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoginEnable: true,
            error: ''
        }
    }

    handleSubmit = (e: any) => {
        this.setState({
            isLoginEnable: false
        });
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            axios.post('/api/v1/user/login', values).then((response) => {
                if (response.status === 200)
                    window.location.href = '/';
                else {
                    message.error('Email or password are incorrect');
                    this.setState({
                        error: 'Email or password are incorrect',
                        isLoginEnable: true
                    });
                }
            }).catch((error) => {
                message.error(error.response.data.clientMessage);
                this.setState({
                    isLoginEnable: true
                });
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={LoginStyle.LoginWrapper} >
                <div className={LoginStyle.Card}>
                    <Card title="Card title">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem
                                label="E-mail"
                                hasFeedback
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                label="Password"
                                hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }],
                                })(
                                    <Input type="password" />
                                )}
                            </FormItem>
                            <FormItem >
                                <Button disabled={!this.state.isLoginEnable} type="primary" htmlType="submit">Login</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export const LoginPage = Form.create()(Login);
