import React, { useState } from 'react'
import dynamic from 'next/dynamic';
const RegisterForm = dynamic(
    async () => await import('@/components/auth/RegisterForm')
);
const OtpForm = dynamic(
    async () => await import('@/components/auth/OptForm')
);

const Register = () => {

    const [isOtpSend, setIsOtpSend] = useState(false)

    const [loading, setLoading] = useState(false)
    const [newCodeTimer, setNewCodeTimer] = useState(Date.now() + 59000)
    const [mount, setMount] = useState(true)
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const onFinish = (values) => {

        console.log(values)
        setIsOtpSend(true)
        setTimeout(() => {
            setMount(true)
        }, 100);
        setNewCodeTimer(Date.now() + 59000)
        // setLoading(true)
        // axios.post('user/signup', values)
        //     .then(res => {

        //         if (res.data.isOtpSend) {
        //             setError(null)
        //             setIsOtpSend(true)
        //             setEmail(res.data.email)
        //             setMount(false)
        //             setLoading(false)
        //             setTimeout(() => {
        //                 setMount(true)
        //             }, 100);
        //             setNewCodeTimer(Date.now() + 59000)
        //         }

        //         setLoading(false)

        //     })
        //     .catch(err => {
        //         setError(err && err.response && err.response.data);
        //         setLoading(false)
        //         console.log(err);
        //     })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='gradient_bg'>

            <div className='main_container registration_form'>
                {
                    isOtpSend ? <OtpForm mount={mount} newCodeTimer={newCodeTimer} /> : <RegisterForm onFinishFailed={onFinishFailed} onFinish={onFinish} loading={loading} />
                }

                <p className='pt-3 text_gray fs-6'>By clicking “Sign In”, you agree to our <span className='text_primary'>Terms of Use and Privacy Policy.</span></p>
            </div>
        </div>
    )
}

export default Register