import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { TbMail } from 'react-icons/tb'

const ForgotPassForm = ({ setActive }) => {

    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        console.log(values)
        setActive('reset')
    }

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


            <button className="submit_button" disabled={loading} type="primary" htmlType="submit">
                Get OTP
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>
        </Form >
    )
}

export default ForgotPassForm