import { notificationFunc } from '@/components/global/notification';
import axiosInstance from '@/lib/axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

const OAuthCallback = () => {
    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));

        const accessToken = params.get('access_token');
        const idToken = params.get('id_token');

        if (idToken) {
            console.log(idToken)
            axiosInstance.post('/user/googleauth', { tokenId: idToken })
                .then(res => {
                    console.log(res)
                    if (res.data.requiredPassword) {
                        setIsModalVisible(true)
                        setTokenId(idToken)
                    } else {
                        Cookies.set("myshop_auth2", idToken);
                        notificationFunc("success", "Logged in successfully")
                        setTimeout(() => {
                            window.location.pathname = '/'
                        }, 3000);
                    }
                })
        }
    }, []);

    return (
        <div>
            Processing Google authentication...
        </div>
    );
};

export default OAuthCallback;
