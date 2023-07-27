
import { Button, Form, Input, Typography } from "antd";

import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getSignedInUserDetailsFromQuerySnapshot, getUserQuerySnapshot, signInWithEmailAndPasswordAsync, signInWithGoogleAsync, signOutAsync } from "../../../services/auth-service";

import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from "../../../store/features/auth/authSlice";
import { getAdditionalUserInfo } from "firebase/auth";
import useNotification from "antd/es/notification/useNotification";
import { setLoadingSpinner } from "../../../store/features/loading/loadingSlice";
import { addNewRecordToFirestoreAsync, handleFirebaseAuthError } from "../../../services/firebase-service";

import './Login.css';

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
    const [api, contextHolder] = useNotification();

    const currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginFormFinish = async (loginFormValues) => {
        try {
            const { email, password } = { ...loginFormValues };

            const signedInUserCredentials = await signInWithEmailAndPasswordAsync(
                email, password
            );

            const { user: { uid, emailVerified, accessToken, refreshToken } } = signedInUserCredentials;

            if (!emailVerified) {
                await signOutAsync();
                openLoginNotificationWithIcon(
                    'error', 'Login failed', 'The provided email has not yet been verified'
                );
            } else {
                const signedInUserDetails = await getSignedInUserDetailsFromQuerySnapshot(uid);
                const additionalUserInfo = getAdditionalUserInfo(signedInUserCredentials);
    
                dispatch(authenticateUser({
                    currentUser: {
                        uid,
                        email,
                        username: signedInUserDetails.username,
                        authProvider: signedInUserDetails.authProvider,
                        role: signedInUserDetails.role,
                        isNewUser: additionalUserInfo.isNewUser,
                        accessToken,
                        refreshToken
                    }
                }));
    
                navigate('/');    
            }
        } catch (error) {
            handleFirebaseAuthError(
                error, 'Login failed', openLoginNotificationWithIcon
            );
        }
    }

    const onLoginFormFinishFailed = (error) => {
        openLoginNotificationWithIcon(
            'error', 'Login failed', 'Validation errors found!'
        );
        console.log('validation error / error\'s', error);
    }

    const loginWithGoogle = async () => {
        try {   
            const signedInUserWithGoogleCredentials = await signInWithGoogleAsync();
            const authenticatedUserByGoogle = signedInUserWithGoogleCredentials.user;
            const authenticatedUserByGoogleQuerySnapshot = await getUserQuerySnapshot(authenticatedUserByGoogle.uid);

            const { uid, displayName: username, email, accessToken, refreshToken } = authenticatedUserByGoogle;

            if (authenticatedUserByGoogleQuerySnapshot.docs.length === 0) {
                const userToSave = {
                    uid,
                    username,
                    authProvider: "google",
                    email,
                    role: 'user'
                };

                await addNewRecordToFirestoreAsync("users", userToSave).then(() => {
                    dispatch(authenticateUser({
                        currentUser: {
                            ...userToSave,
                            isNewUser: false,
                            accessToken,
                            refreshToken
                        }
                    }));

                    navigate('/');
                });
            } else {
                const signedInUserDetails = await getSignedInUserDetailsFromQuerySnapshot(uid);
                const additionalUserInfo = getAdditionalUserInfo(signedInUserWithGoogleCredentials);

                dispatch(authenticateUser({
                    currentUser: {
                        uid,
                        email,
                        username: signedInUserDetails.username,
                        authProvider: signedInUserDetails.authProvider,
                        role: signedInUserDetails.role,
                        isNewUser: additionalUserInfo.isNewUser,
                        accessToken,
                        refreshToken
                    }
                }));

                navigate('/');
            }
        } catch (error) {
            handleFirebaseAuthError(
                error, 'Login failed', openLoginNotificationWithIcon
            );
        }
    }

    const openLoginNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        });
    }

    useEffect(() => {
        if (!currentUser) {
            setTimeout(() => {
                dispatch(setLoadingSpinner(false));
            }, 500);
        } else {
            console.log('HERE IN EFFECT');

            if (currentUser.isNewUser) {
                setTimeout(() => {
                    dispatch(setLoadingSpinner(false));
                }, 500);
                
                return;
            }

            navigate('/');
        }
    }, [currentUser, navigate, dispatch]);

    return (
        <div className="login-page-wrapper">
            <div className="login-form-container">
                {contextHolder}
                <Form
                    {...formItemLayout}
                    form={loginForm}
                    name="register"
                    onFinish={onLoginFormFinish}
                    onFinishFailed={onLoginFormFinishFailed}
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
                                message: 'The input is not a valid e-mail!'
                            }
                        ]}
                    >
                        <Input className="login-form-text-input" />
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
                        <Input.Password className="login-form-text-input" />
                    </Form.Item>
                    <Typography.Title
                        level={3}
                    >
                        <NavLink to="/forgot-password" style={{ color: '#0a2db5' }}>Forgot Password?</NavLink>
                    </Typography.Title>
                    <Typography.Title
                        level={3}
                    >
                        Don't have an account? <NavLink to="/register" style={{ color: '#0a2db5' }}>Register</NavLink>
                    </Typography.Title>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-button">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} style={{ marginBottom: 0 }}>
                        <Button type="primary" className="login-button" onClick={loginWithGoogle}>
                            Login With Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}