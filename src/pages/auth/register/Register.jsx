
import { Checkbox, Form, Input, Button, Typography, notification } from "antd";

import React from 'react';

import { createUserWithEmailAndPasswordAsync } from "../../../services/auth-service";
import { NavLink } from "react-router-dom";

import { addNewRecordToFirestoreAsync, getFirebaseAuthErrorInfo } from "../../../helpers/firebase-helper";
import { getAdditionalUserInfo } from "firebase/auth";

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
    const [api, contextHolder] = notification.useNotification();

    const onRegisterFormFinish = async (registerFormValues) => {
        try {
            const { username, email, password } = { ...registerFormValues };

            const createdUserWithEmailAndPasswordCredentials = await createUserWithEmailAndPasswordAsync(
                email, password
            );

            const { user } = createdUserWithEmailAndPasswordCredentials;

            console.log('registered user details');
            console.log(user);

            const idTokenResult = await user.getIdTokenResult();

            console.log('id token result');
            console.log(idTokenResult);

            const createdUserWithEmailAndPasswordAdditionalInfo = getAdditionalUserInfo(
                createdUserWithEmailAndPasswordCredentials
            );

            const userToSave = {
                uid: user.uid,
                username,
                authProvider: 'local',
                email,
                role: 'user',
                isNewUser: createdUserWithEmailAndPasswordAdditionalInfo.isNewUser
            };

            await addNewRecordToFirestoreAsync('users', userToSave);
        } catch (error) {
            if (error.code !== undefined) {
                const errorCodeKey = error.code;
                const registerFirebaseAuthErrorInfo = getFirebaseAuthErrorInfo(errorCodeKey);

                if (registerFirebaseAuthErrorInfo !== []) {
                    const [authErrorType, authErrorDescription] = registerFirebaseAuthErrorInfo;

                    switch (authErrorType) {
                        case "user-friendly":
                            openRegistrationNotificationWithIcon(
                                'error', 'Registration failed', authErrorDescription
                            );
                            break;
                        case "system":
                            openRegistrationNotificationWithIcon(
                                'error', 'Registration failed', 'A system error has occurred. Try again later'
                            );
                            console.log('error', authErrorDescription);
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log('error', error);
                }
            } else {
                console.log('error', error);
            }
        }
    }

    const onRegisterFormFinishFailed = (error) => {
        openRegistrationNotificationWithIcon(
            'error', 'Registration failed', 'Validation errors found'
        );
        console.log('validation error / error\'s', error);
    }

    const openRegistrationNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        });
    }

    return (
        <div className="register-form-wrapper">
            {contextHolder}
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
                    autoComplete="off"
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
                    autoComplete="off"
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