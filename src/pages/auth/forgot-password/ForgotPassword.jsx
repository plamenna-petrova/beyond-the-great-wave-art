import { Form, Input, Button, Typography } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { NavLink } from "react-router-dom";
import { sendPasswordResetLinkEmailAsync } from "../../../services/auth-service";
import { handleFirebaseAuthError } from "../../../services/firebase-service";

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

export default function ForgotPassword() {
    const [forgotPasswordForm] = Form.useForm();
    const [api, contextHolder] = useNotification();

    const onForgotPasswordFormFinish = async (forgotPasswordValues) => {
        try {
            const { email } = forgotPasswordValues;
            await sendPasswordResetLinkEmailAsync(email);
            openForgotPasswordNotificationWithIcon(
                'success', 'Password reset link sent', 'Check your email'
            );
        } catch (error) {
            handleFirebaseAuthError(
                error, 'Couldn\'t send a password reset email', openForgotPasswordNotificationWithIcon
            );
        }
    }

    const onForgotPasswordFinishFailed = (error) => {
        openForgotPasswordNotificationWithIcon(
            'error', 'Password reset link sending failed', 'Validation errors found!'
        );
        console.log('validation error / error\'s', error);
    }

    const openForgotPasswordNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        })       
    }

    return (
        <div className="forgot-password-wrapper" style={{ marginTop: 200 + 'px' }}>
            <div className="forgot-password-form-container">
                {contextHolder}
                <Form
                    {...formItemLayout}
                    form={forgotPasswordForm}
                    name="forgot-password"
                    onFinish={onForgotPasswordFormFinish}
                    onFinishFailed={onForgotPasswordFinishFailed}
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
                        <Input />
                    </Form.Item>
                    <Typography.Title
                        level={3}
                    >
                        <NavLink to="/login" style={{ color: '#0a2db5'}}>Go Back To Login</NavLink>
                    </Typography.Title>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Send Password Reset Email
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}