import { Flex, Form, Input } from 'antd'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import Countdown from 'react-countdown';

const OptForm = ({ newCodeTimer, mount, setOtp, verifyOtp, loading, resendOtp }) => {

    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // Render a completed state

            return <button onClick={() => resendOtp()} className="resend_button">Resend Code</button>
        } else {
            // Render a countdown
            return <button className="resend_button">Resend Code ({seconds}s)</button>

        }
    };

    return (
        <div
            className='form'
        >
            <h3 className='section_title'>Email Verification</h3>
            <p className='section_subtitle'>Verification code has been sent to you email. Please wait a few minutes.</p>

            {
                mount && <Countdown
                    date={newCodeTimer}
                    renderer={renderer}
                />}

            <Flex justify='center' className='pt-3'>
                <Input.OTP className='otp_input' length={6} onChange={value => setOtp(value)} />
            </Flex>

            <button onClick={() => verifyOtp()} className="submit_button mt-4" disabled={loading} type="primary">
                Submit
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>
        </div>
    )
}

export default OptForm