
import dynamic from 'next/dynamic';
import React, { useState } from 'react'


const ForgotPassForm = dynamic(
    async () => await import('@/components/auth/ForgotPassForm')
);
const ResetForm = dynamic(
    async () => await import('@/components/auth/ResetForm')
);

const ForgotPassword = () => {

    const [active, setActive] = useState('otp')
    const [email, setEmail] = useState('')

    return (
        <div className='gradient_bg'>
            <div className='main_container registration_form'>
                {active === 'otp' && <ForgotPassForm setActive={setActive} setEmail={setEmail} />}
                {active === 'reset' && <ResetForm setActive={setActive} email={email} />}
            </div>
        </div>
    )
}

export default ForgotPassword