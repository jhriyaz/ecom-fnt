import React, { useEffect, useState } from 'react'
import { Form, Input, Spin } from 'antd'
import { TbMail } from 'react-icons/tb'
import axiosInstance from '@/lib/axios'
import { notificationFunc } from '../global/notification'
import { useRouter } from 'next/router'

const ForgotPassForm = ({ setEmail, email }) => {

    const [isLoading, setIsLoading] = useState(false)
    const Router = useRouter()

    const onFinish = (values) => {
        setIsLoading(true)
        axiosInstance.post('/user/forgotPassword', values)
            .then(res => {
                console.log(res.data)
                let { isOtpSend, success, token } = res.data
                if (isOtpSend) {
                    notificationFunc("success", "A code has been sent to your Email")
                    setIsLoading(false)
                    Router.push('/auth/forgot-password?step=reset')
                    setEmail(values.email)
                }
            })
            .catch(err => {
                console.log(err);
                notificationFunc('error', err?.response?.data?.error)
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
            <p className='section_subtitle'>Enter your email. We will send you and OTP</p>

            <Form.Item
                name="email"
                className="default_form_item"
                initialValue={email}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input prefix={<TbMail size={20} />} placeholder="Email Address" className='default_input' />
            </Form.Item>


            <button className="submit_button" disabled={isLoading} type="primary" htmlType="submit">
                Get OTP
                {
                    isLoading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>
        </Form >
    )
}

export default ForgotPassForm