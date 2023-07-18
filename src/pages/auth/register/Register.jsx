
import { Checkbox, Form, Input, Button, Typography } from "antd";

import React, { useEffect } from 'react';

import { createUserWithEmailAndPasswordAsync } from "../../../services/auth-service";
import { NavLink, useNavigate } from "react-router-dom";

import { addNewRecordToFirestoreAsync } from "../../../helpers/firebase-helper";
import { getAdditionalUserInfo } from "firebase/auth";

import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from "../../../store/features/auth/authSlice";

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
    const currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegisterFormFinish = async (registerFormValues) => {
        try {
            const { username, email, password } = { ...registerFormValues };

            const createdUserWithEmailAndPasswordCredentials = await createUserWithEmailAndPasswordAsync(
                email, password
            );

            const { user } = createdUserWithEmailAndPasswordCredentials;
    
            const userToSave = {
                uid: user.uid,
                username,
                authProvider: "local",
                email
            };
    
            await addNewRecordToFirestoreAsync("users", userToSave).then(() => {
                const { authProvider, ...userDetails } = userToSave;
    
                dispatch(authenticateUser({
                    currentUser: {
                        ...userDetails,
                        isNewUser: getAdditionalUserInfo(createdUserWithEmailAndPasswordCredentials).isNewUser,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken
                    }
                }));
    
                navigate('/login');
            });
        } catch(error) {
            console.log('error', error);
        }
    }

    const onRegisterFormFinishFailed = (error) => {
        console.log('error', error);
    }

    useEffect(() => {
        if (currentUser) {;
            navigate('/login');
        }
        
    }, [currentUser, navigate]);

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
                        },
                        {
                            min: 6,
                            message: 'The password must be at least 6 symbols long'
                        },
                        {
                            max: 16,
                            message: 'The pasword cannot be longer than 16 symbols'
                        },
                        {
                            pattern: new RegExp(/^(?=.*\d)(?=.*[!@#$%^&/\\[\];',<>{}"+=.*])(?=.*[a-z])(?=.*[A-Z]).{4,}$/),
                            message: 'The password must include at least one number, one uppercase character ' +
                                'and one special character'
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
                                    new Error('The password and the confirmation password do not match!')
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
                <Typography.Title
                    level={3}
                    style={{
                        margin: 0,
                    }}
                >
                    Already have an account? <NavLink to="/login">Login</NavLink>
                </Typography.Title>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}