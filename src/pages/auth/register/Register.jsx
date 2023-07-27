
import { Checkbox, Form, Input, Button, Typography, notification } from "antd";

import React from 'react';

import { createUserWithEmailAndPasswordAsync, getUserQuerySnapshot, sendEmailVerificationAsync, signInWithGoogleAsync } from "../../../services/auth-service";
import { NavLink, useNavigate } from "react-router-dom";

import { addNewRecordToFirestoreAsync, handleFirebaseAuthError } from "../../../services/firebase-service";
import { getAdditionalUserInfo } from "firebase/auth";

import { useDispatch } from 'react-redux';
import { authenticateUser } from "../../../store/features/auth/authSlice";
import { signOutAsync } from "../../../services/auth-service";
import { setLoadingSpinner } from "../../../store/features/loading/loadingSlice";

import './Register.css';

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRegisterFormFinish = async (registerFormValues) => {
        try {
            const { username, email, password } = { ...registerFormValues };

            const createdUserWithEmailAndPasswordCredentials = await createUserWithEmailAndPasswordAsync(
                email, password
            );

            const { user } = createdUserWithEmailAndPasswordCredentials;

            await sendEmailVerificationAsync(user);

            const userToSave = {
                uid: user.uid,
                username,
                authProvider: "local",
                email,
                role: 'user'
            };

            await addNewRecordToFirestoreAsync("users", userToSave).then(async () => {

                const additionalUserInfo = getAdditionalUserInfo(createdUserWithEmailAndPasswordCredentials);

                dispatch(authenticateUser({
                    currentUser: {
                        ...userToSave,
                        isNewUser: additionalUserInfo.isNewUser,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken
                    }
                }));

                await signOutAsync().then(() => {
                    dispatch(setLoadingSpinner(true));
                    navigate('/login');
                }).catch((error) => {
                    console.log('error', error);
                });
            });
        } catch (error) {
            handleFirebaseAuthError(
                error, 'Registration failed', openRegistrationNotificationWithIcon
            );
        }
    }

    const onRegisterFormFinishFailed = (error) => {
        openRegistrationNotificationWithIcon(
            'error', 'Registration failed', 'Validation errors found!'
        );
        console.log('validation error / error\'s', error);
    }

    const registerWithGoogle = async () => {
        try {
            const signInWithGoogleCredentails = await signInWithGoogleAsync();
            const authenticatedUserByGoogle = signInWithGoogleCredentails.user;
            const authenticatedUserByGoogleQuerySnapshot = await getUserQuerySnapshot(authenticatedUserByGoogle.uid);

            if (authenticatedUserByGoogleQuerySnapshot.docs.length !== 0) {
                dispatch(setLoadingSpinner(true));
                await signOutAsync().then(() => {
                    dispatch(authenticateUser({ currentUser: null }));
                    setTimeout(() => {
                        dispatch(setLoadingSpinner(false));
                        openRegistrationNotificationWithIcon(
                            'error', 
                            'Registration failed', 
                            'We have found an already created account with Google. Try to login instead', 
                            10
                        );
                    }, 500);
                });
                return;
            } else {
                const { uid, displayName: username, email, accessToken, refreshToken } = authenticatedUserByGoogle;
     
                const userToSave = {
                    uid,
                    username,
                    authProvider: "google",
                    email,
                    role: 'user'
                };
    
                await addNewRecordToFirestoreAsync("users", userToSave).then(async () => {
                    const additionalUserInfo = getAdditionalUserInfo(signInWithGoogleCredentails);

                    dispatch(authenticateUser({
                        currentUser: {
                            ...userToSave,
                            isNewUser: additionalUserInfo.isNewUser,
                            accessToken,
                            refreshToken
                        }
                    }));

                    await signOutAsync().then(() => {
                        dispatch(setLoadingSpinner(true));
                        navigate('/login');
                    }).catch((error) => {
                        console.log('error', error);
                    });
                });
            }
        } catch (error) {
            handleFirebaseAuthError(
                error, 'Registration failed', openRegistrationNotificationWithIcon
            );
        }
    }

    const openRegistrationNotificationWithIcon = (type, message, description, duration) => {
        api[type]({
            message,
            description,
            duration: duration ? duration : 0
        });
    }

    return (
        <div className="register-page-wrapper">
            <div className="register-form-container">
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
                        <Input className="register-form-text-input" />
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
                        <Input className="register-form-text-input" />
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
                        <Input.Password className="register-form-text-input" />
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
                        <Input.Password className="register-form-text-input" />
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
                            I have read the <a href="/" style={{ color: '#0a2db5' }}>agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Typography.Title
                        level={3}
                    >
                        Already have an account? <NavLink to="/login" style={{ color: '#0a2db5' }}>Login</NavLink>
                    </Typography.Title>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="register-button">
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" className="register-button" onClick={registerWithGoogle}>
                            Register With Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}