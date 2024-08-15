import { Flex, Form, Input } from 'antd'
import React, { useState } from 'react'
import Countdown from 'react-countdown';

const OptForm = ({ newCodeTimer, mount }) => {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(otp)

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

            <button className="submit_button mt-4" disabled={loading} type="primary" htmlType="submit">
                Submit
                {
                    loading && <Spin size='small' style={{ marginLeft: "10px" }} />
                }

            </button>
        </div>
    )
}

export default OptForm