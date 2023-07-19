
import { Button, Form, Input, Typography } from "antd";

import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getSignedInUserDetailsFromSnapshot, signInWithEmailAndPasswordAsync } from "../../../services/auth-service";

import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from "../../../store/features/auth/authSlice";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";

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

    const currentUser = useSelector((state) => state.auth.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginFormFinish = async (loginFormValues) => {
        const { email, password } = { ...loginFormValues };

        const signedInUserCredentials = await signInWithEmailAndPasswordAsync(
            email, password
        );

        const { user: { uid, accessToken, refreshToken } } = signedInUserCredentials;

        const signedInUserDetails = await getSignedInUserDetailsFromSnapshot(uid);

        console.log('signed in user details');
        console.log(signedInUserDetails);

        const { docId, ...signedInUserInfo } = signedInUserDetails;

        if (signedInUserDetails.isNewUser) {
            await updateDoc(doc(firestore, "users", docId), {
                isNewUser: false
            });

            console.log('UPDATED USER');
            
            dispatch(authenticateUser({
                currentUser: {
                    uid,
                    email,
                    username: signedInUserInfo.username,
                    authProvider: signedInUserInfo.authProvider,
                    role: signedInUserInfo.role,
                    isNewUser: false,
                    accessToken,
                    refreshToken
                }
            }));
        } else {
            dispatch(authenticateUser({
                currentUser: {
                    uid,
                    email,
                    ...signedInUserInfo,
                    accessToken,
                    refreshToken
                }
            }));
        }
    }

    const onLoginFormFinishFailed = (error) => {
        console.log('login failed');
        console.log('error', error);
    }

    useEffect(() => {
        if (currentUser) {
            if (currentUser.isNewUser) {
                return;
            }

            navigate('/');
        }
    }, [currentUser, navigate, dispatch]);

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