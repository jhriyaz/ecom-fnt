import LoginForm from '@/components/auth/LoginForm'
import React from 'react'


const Login = () => {
    return (
        <div className='gradient_bg'>
            <div className='main_container registration_form'>
                <LoginForm />


                <p className='pt-3 text_gray fs-6'>By clicking “Sign In”, you agree to our <span className='text_primary'>Terms of Use and Privacy Policy.</span></p>
            </div>
        </div>
    )
}

export default Login