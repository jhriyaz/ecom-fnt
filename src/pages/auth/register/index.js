import React, { useEffect, useState } from 'react'
import { notificationFunc } from '@/components/global/notification';
import Cookies from 'js-cookie';
import RegisterForm from '@/components/auth/RegisterForm'
import OtpForm from '@/components/auth/OptForm'
import axiosInstance from "@/lib/axios";
import { useSelector } from 'react-redux';


const Register = () => {

    const [isOtpSend, setIsOtpSend] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newCodeTimer, setNewCodeTimer] = useState(Date.now() + 59000)
    const [mount, setMount] = useState(true)
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [otp, setOtp] = useState('')


    console.log(email)

    const verifyOtp = () => {
        if (otp.length === 6) {
            axiosInstance.post('/user/verifyotp', { email, otp })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        Cookies.set("myshop_auth2", res.data.token);
                        notificationFunc("success", "Registered successfully")

                        setTimeout(() => {
                            window.location.pathname = '/'
                        }, 3000);

                    }
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                    err && err.response && setError(err.response.data)
                })
        } else {
            setError({ message: "OTP should be 6 digit" })
        }
    }

    const resendOtp = () => {
        axiosInstance.post('/user/resendotp', { email })
            .then(res => {
                if (res.data.isOtpSend) {
                    setError(null)
                    notificationFunc("success", "A new code has been sent to your number")
                    setMount(false)
                    setTimeout(() => {
                        setMount(true)
                    }, 100);
                    setNewCodeTimer(Date.now() + 59000)
                }
            })
            .catch(err => {
                err && err.response && setError(err.response.data)
            })

    }

    const onFinish = (values) => {
        console.log(values)
        setLoading(true)
        axiosInstance.post('/user/signup', values)
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
                console.log(err)
                setError(err && err.response && err.response.data);
                setLoading(false)
                notificationFunc('error', err.response.data.message)
            })

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='gradient_bg'>

            <div className='main_container registration_form'>
                {
                    isOtpSend ? <OtpForm
                        loading={loading}
                        setOtp={setOtp}
                        verifyOtp={verifyOtp}
                        mount={mount}
                        newCodeTimer={newCodeTimer}
                        resendOtp={resendOtp}
                    /> :
                        <RegisterForm
                            onFinishFailed={onFinishFailed}
                            onFinish={onFinish}
                            loading={loading} />
                }

                <p className='pt-3 text_gray fs-6'>By clicking “Sign In”, you agree to our <span className='text_primary'>Terms of Use and Privacy Policy.</span></p>
            </div>
        </div>
    )
}

export default Register