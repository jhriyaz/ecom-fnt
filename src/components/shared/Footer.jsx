import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <div id='footer'>
            <div className='main_container'>
                <div className='footer-container'>
                    <div className='d-flex flex-column justify-content-start gap-4'>
                        <Image className='logo' src={'/logo.png'} height={40} width={100} alt='footer-logo' />
                        <p className='text'>techserve4u@gmail.com</p>
                        <p className='text'>+123-589-9763</p>
                        <p className='text'>King Street, Melbourne,Australia</p>
                    </div>
                    <div className='d-flex flex-column justify-content-start gap-4'>
                        <h3 className='section_title text-start'>Categories</h3>
                        <p className='text'>About Us</p>
                        <p className='text'>Shop</p>
                        <p className='text'>Contact Us</p>
                        <p className='text'>Resources</p>
                    </div>
                    <div className='d-flex flex-column justify-content-start gap-4'>
                        <h3 className='section_title text-start'>My Account</h3>
                        <p className='text'>Support</p>
                        <p className='text'>Your Quotes</p>
                        <p className='text'>Track your Order</p>
                    </div>
                    <div className='d-flex flex-column justify-content-start gap-4'>
                        <h3 className='section_title text-start'>Follow Us</h3>
                        <p className='text'>It is a long established fact that a reader will be distracted by the readable
                            looking at its layout.</p>
                        <div className='social'>
                            <button><FaFacebook /></button>
                            <button><FaTwitter /></button>
                            <button><FaYoutube /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='copyright_wrapper'>
                <div className='main_container copyright'>
                    <p>2024. All right reserved design by techserve4u </p>
                    <div className='links'>
                        <Link href={'/'}>Setting & Privacy</Link>
                        <Link href={'/'}>Faqs</Link>
                        <Link href={'/'}>Services</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer