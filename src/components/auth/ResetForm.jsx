import { Form, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { BiLock } from 'react-icons/bi'
import { TbPasswordMobilePhone } from 'react-icons/tb'
import { notificationFunc } from '../global/notification'
import { useRouter } from 'next/router'
import axiosInstance from "@/lib/axios";

const ResetForm = ({ email }) => {

    const [isLoading, setIsLoading] = useState(false)

    const Router = useRouter()

    const onFinish = (values) => {

        setIsLoading(true)
        axiosInstance.patch('/user/resetPassword/', { email, otp: values.otp, password: values.password })
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    notificationFunc("success", "Password changed successfully")
                    window.location.pathname = '/auth/login'
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.response);
                notificationFunc('error', err.response?.data?.error)
                setIsLoading(false)
            })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            className='form'
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h3 className='section_title'>Forgot Password</h3>
            <p className='section_subtitle'>
                An OTP was sent to your email address. Please check your email
            </p>

            <Form.Item
                name="otp"
                className="default_form_item"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the OTP'
                    }
                ]}
            >
                <Input prefix={<TbPasswordMobilePhone size={20} />} placeholder="OTP" className='default_input' />
            </Form.Item>
            <Form.Item
                name="password"
                className="default_form_item"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        min: 6,
                        message: 'Password must be at least 6 charecters'
                    },
                    {
                        whitespace: false,
                        message: "Can't use space in password"
                    }
                ]}
                hasFeedback
            >
                <Input.Password prefix={<BiLock size={20} />} placeholder='Password' className='default_input' />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                className="default_form_item"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder='Confirm Password' prefix={<BiLock size={20} />} className='default_input' />
            </Form.Item>


            <button className="submit_button" disabled={isLoading} type="primary" htmlType="submit">
                Reset Password
                {
                    isLoading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>

            <p className='text_primary text-center pt-3' onClick={() => Router.push('/auth/forgot-password?step=otp')}>Change Email</p>
        </Form >
    )
}

export default ResetForm