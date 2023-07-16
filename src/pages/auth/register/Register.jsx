
import { Checkbox, Form, Input, Button } from "antd";

import React, { useEffect } from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPasswordAsync } from "../../../services/auth-service";
import { useNavigate } from "react-router-dom";

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
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 25,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

export default function Register() {
    const [registerForm] = Form.useForm();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const onRegisterFormFinish = (registerFormValues) => {
        console.log('Received values of form: ', registerFormValues);
        const { username, email, password } = { ...registerFormValues };
        console.log('destructed');
        console.log(email, username, password);
        createUserWithEmailAndPasswordAsync(username, email, password);
    }

    const onRegisterFormFinishFailed = (error) => {
        console.log('error', error);
    }

    useEffect(() => {
        if (loading) {
            return;
        }

        if (user) {
            navigate('/');
        }
    }, [user, loading]);

    return (
        <div className="register-form-wrapper">
            <Form
                {...formItemLayout}
                form={registerForm}
                name="register"
                onFinish={onRegisterFormFinish}
                onFinishFailed={onRegisterFormFinishFailed}
                style={{
                    maxWidth: 600,
                    marginTop: 10 + '%'
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your username!',
                            whitespace: true
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
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
                            message: 'The input is not a valid e-mail!'
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
                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The password and confirmation password do not match!')
                                );
                            }
                        })
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => value
                                ? Promise.resolve()
                                : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="/">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}