import { Checkbox, Divider, Form, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { TbMail } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import dynamic from 'next/dynamic';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const RegisterForm = () => {

    const [loading, setLoading] = useState(false)
    const [newCodeTimer, setNewCodeTimer] = useState(Date.now() + 59000)
    const [mount, setMount] = useState(true)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState(null)
    const [isOtpSend, setIsOtpSend] = useState(false)



    const onFinish = (values) => {

        console.log(values)
        setLoading(true)
        axios.post('user/signup', values)
            .then(res => {

                if (res.data.isOtpSend) {
                    setError(null)
                    setIsOtpSend(true)
                    setEmail(res.data.email)
                    setMount(false)
                    setLoading(false)
                    setTimeout(() => {
                        setMount(true)
                    }, 100);
                    setNewCodeTimer(Date.now() + 59000)
                }

                setLoading(false)

            })
            .catch(err => {
                setError(err && err.response && err.response.data);
                setLoading(false)
                console.log(err);
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
            <h3 className='section_title'>Registration</h3>
            <p className='section_subtitle'>To stay connected with us, please registration.</p>
            <Form.Item
                name="name"
                className="default_form_item"
            >
                <Input prefix={<HiOutlineUserCircle size={20} />} className='default_input' placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="email"
                className="default_form_item"
            >
                <Input prefix={<TbMail size={20} />} placeholder="Email Address" className='default_input' />
            </Form.Item>

            <Form.Item
                name="password"
                className="default_form_item"
            >
                <Input.Password prefix={<BiLock size={20} />} placeholder='Password' className='default_input' />
                <div className='d-flex align-items-center justify-content-between pt-2'>
                    <p>
                        <Checkbox className="be-vietnam-pro">
                            Keep signed in to stay connected.
                        </Checkbox>
                    </p>
                    <p className='text-end'>Must be at least 8 characters</p>
                </div>
            </Form.Item>

            <button className="submit_button" disabled={loading} type="primary" htmlType="submit">
                Register
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>

            <Divider className='fs-6 text_gray'>Or Register With</Divider>

            <button htmlType="button" className='default_input'>
                <div className='d-flex align-items-center justify-content-center gap-2'>
                    <FcGoogle size={20} />
                    Continue with Google
                </div>
            </button>

            <p className='text-center fs-6 text_gray fw-semibold pt-3'>Already have an account? <Link href={'/login'}>Login</Link></p>
        </Form >
    )
}

export default RegisterForm