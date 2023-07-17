
import { Button, Form, Input, Typography } from "antd";

import React, { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signInWithEmailAndPasswordAsync } from "../../../services/auth-service";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 25,
        offset: 0
    },
    sm: {
        span: 16,
        offset: 8
    }
};

export default function Login() {
    const [loginForm] = Form.useForm();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const onLoginFormFinish = (loginFormValues) => {
        const { email, password } = { ...loginFormValues };
        signInWithEmailAndPasswordAsync(email, password);
    }

    const onLoginFormFinishFailed = (error) => {
        console.log('login failed');
        console.log('error', error);
    }

    useEffect(() => {
        if (loading) {
            return;
        }

        if (user) {
            console.log('user details after login');
            console.log(user);
            localStorage.setItem('accessToken', user.accessToken);
            localStorage.setItem('refreshToken', user.refreshToken);
            navigate('/');
        }
    }, [user, loading, navigate]);

    return (
        <div className="login-form-wrapper">
            <Form
                {...formItemLayout}
                form={loginForm}
                name="register"
                onFinish={onLoginFormFinish}
                onFinishFailed={onLoginFormFinishFailed}
                style={{
                    maxWidth: 600,
                    marginTop: 10 + '%'
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail address"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your e-mail!'
                        },
                        {
                             type: 'email',
                             message: 'The input is not a valid email!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Typography.Title
                    level={3}
                    style={{
                        margin: 0
                    }}
                >
                    Don't have an account? <NavLink to="/register">Register</NavLink>
                </Typography.Title>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="sumit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}