const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = 'http://localhost:3001';
    const scope = 'openid profile email';
    const responseType = 'token id_token'; // Request both access token and id_token
    const nonce = process.env.NEXT_SECRET

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=select_account&nonce=${nonce}`;

    window.location.href = googleAuthUrl;
};

export default handleGoogleSignIn