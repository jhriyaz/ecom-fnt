import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { BiLock } from 'react-icons/bi'
import { MdSecurity } from 'react-icons/md'
import { TbMail, TbPasswordMobilePhone } from 'react-icons/tb'

const ResetForm = ({ setActive }) => {

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
                {/* <span className='icon'>
                    
                </span> */}
            </Form.Item>
            <Form.Item
                name="password"
                className="default_form_item"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
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


            <button className="submit_button" disabled={loading} type="primary" htmlType="submit">
                Reset Password
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>

            <p className='text_primary text-center pt-3' onClick={() => setActive('otp')}>Change Email</p>
        </Form >
    )
}

export default ResetForm