import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { TbMail } from "react-icons/tb";
import { BiLock } from "react-icons/bi";
import dynamic from 'next/dynamic';
const RegisterForm = dynamic(
    async () => await import('@/components/auth/RegisterForm')
);

const Register = () => {

    return (
        <div className='gradient_bg'>

            <div className='main_container registration_form'>
                <RegisterForm />

                <p className='pt-3 text_gray fs-6'>By clicking “Sign In”, you agree to our <span className='text_primary'>Terms of Use and Privacy Policy.</span></p>
            </div>
        </div>
    )
}

export default Register