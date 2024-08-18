
import ForgotPassForm from '@/components/auth/ForgotPassForm'
import ResetForm from '@/components/auth/ResetForm'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ForgotPassword = () => {

    const [active, setActive] = useState('')
    const [email, setEmail] = useState('')

    const Router = useRouter()

    useEffect(() => {
        if (Router && Router.query.step) {
            setActive(Router.query.step)
        }
        else {
            setActive('otp')
        }
    }, [Router])

    console.log(active)

    return (
        <div className='gradient_bg'>
            <div className='main_container registration_form'>
                {active === 'otp' && <ForgotPassForm setActive={setActive} setEmail={setEmail} email={email} />}
                {active === 'reset' && email && <ResetForm setActive={setActive} email={email} />}
            </div>
        </div>
    )
}

export default ForgotPassword