import { Checkbox, Divider, Form, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { TbMail } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import axiosInstance from '@/lib/axios';

const RegisterForm = ({ onFinishFailed, onFinish, loading }) => {

    // const handleGoogleSignIn = useGoogleLogin({
    //     onSuccess: res => {
    //         console.log(res)
    //         axiosInstance.post('/user/googleauth', { code: res.access_token })
    //             .then(res => {
    //                 if (res.data.requiredPassword) {
    //                     setIsModalVisible(true)
    //                     setTokenId(res.data.tokenId)
    //                 } else {
    //                     Cookies.set("myshop_auth2", res.data.token);
    //                     notificationFunc("success", "Logged in successfully")
    //                     setTimeout(() => {
    //                         window.location.pathname = '/'
    //                     }, 3000);
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     },
    //     scope: 'openid profile email'
    // })

    const handleGoogleSignIn = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = 'http://localhost:3001/auth/google';
        const scope = 'openid profile email';
        const responseType = 'token id_token'; // Request both access token and id_token
        const nonce = process.env.NEXT_SECRET

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=select_account&nonce=${nonce}`;

        window.location.href = googleAuthUrl;
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
                rules={[
                    {
                        required: true,
                        message: "Please enter your name"
                    }
                ]}
            >
                <Input prefix={<HiOutlineUserCircle size={20} />} className='default_input' placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="email"
                className="default_form_item"
                rules={[
                    {
                        required: true,
                        message: "Please enter your Email"
                    }
                ]}
            >
                <Input prefix={<TbMail size={20} />} placeholder="Email Address" className='default_input' />
            </Form.Item>

            <Form.Item
                name="password"
                className="default_form_item"
                rules={[
                    {
                        required: true,
                        message: "Please enter your Password"
                    },
                    {
                        min: 6,
                        message: 'Password has to be at least 6 charecters'
                    }
                ]}
            >
                <Input.Password prefix={<BiLock size={20} />} placeholder='Password' className='default_input' />
            </Form.Item>
            <div className='d-flex align-items-center justify-content-between pt-2'>
                <p>
                    <Checkbox className="be-vietnam-pro">
                        Keep signed in to stay connected.
                    </Checkbox>
                </p>
                <p className='text-end'>Must be at least 8 characters</p>
            </div>

            <button className="submit_button" disabled={loading} type="primary" htmlType="submit">
                Register
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>

            <Divider className='fs-6 text_gray'>Or Register With</Divider>

            <button type='button' htmlType="button" className='default_input' onClick={handleGoogleSignIn}>
                <div className='d-flex align-items-center justify-content-center gap-2'>
                    <FcGoogle size={20} />
                    Continue with Google
                </div>
            </button>
            <p className='text-center fs-6 text_gray fw-semibold pt-3'>Already have an account? <Link href={'/auth/login'}>Login</Link></p>
        </Form >
    )
}

export default RegisterForm