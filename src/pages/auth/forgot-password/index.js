
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

    return (
        <div className='gradient_bg'>
            <div className='main_container registration_form'>
                {active === 'otp' && <ForgotPassForm setActive={setActive} />}
                {active === 'reset' && <ResetForm setActive={setActive} />}
            </div>
        </div>
    )
}

export default ForgotPassword