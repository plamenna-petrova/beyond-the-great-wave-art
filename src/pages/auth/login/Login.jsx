
import { Button, Form, Input, Typography, notification } from "antd";

import React, { useEffect } from 'react';
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { getSignedInUserDetailsFromSnapshot, signInWithEmailAndPasswordAsync } from "../../../services/auth-service";

import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from "../../../store/features/auth/authSlice";
import { getAdditionalUserInfo } from "firebase/auth";
import { getFirebaseAuthErrorInfo } from "../../../helpers/firebase-helper";
import useNotification from "antd/es/notification/useNotification";
import { setLoadingSpinner } from "../../../store/features/loading/loadingSlice";

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

            const { user: { uid, accessToken, refreshToken } } = signedInUserCredentials;

            const signedInUserDetails = await getSignedInUserDetailsFromSnapshot(uid);
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
        } catch (error) {
            if (error.code !== undefined) {
                const errorCodeKey = error.code;
                const registerFirebaseAuthErrorInfo = getFirebaseAuthErrorInfo(errorCodeKey);

                if (registerFirebaseAuthErrorInfo !== []) {
                    const [authErrorType, authErrorDescription] = registerFirebaseAuthErrorInfo;

                    switch (authErrorType) {
                        case "user-friendly":
                            openLoginNotificationWithIcon(
                                'error', 'Login failed', authErrorDescription
                            );
                            break;
                        case "system":
                            openLoginNotificationWithIcon(
                                'error', 'Login failed', 'A system error has occurred. Try again later'
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

    const onLoginFormFinishFailed = (error) => {
        console.log('login failed');
        console.log('error', error);
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
            if (currentUser.isNewUser) {
                setTimeout(() => {
                    dispatch(setLoadingSpinner(false));
                }, 500);

                return;
            }

            navigate('/');
        }
    }, [currentUser, navigate]);

    return (
        <div className="login-form-wrapper">
            {contextHolder}
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