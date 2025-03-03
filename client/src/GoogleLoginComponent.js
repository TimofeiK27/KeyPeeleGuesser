// GoogleLoginComponent.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginComponent({ onLoginSuccess }) {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);

    // credentialResponse.credential contains the JWT token from Google.
    // If needed, you can send it to your backend for verification.
    try {
      // Example: Send token to your backend for further processing.
      const response = await axios.post('/auth/google', {
        token: credentialResponse.credential,
      });
      // onLoginSuccess(response.data);
      onLoginSuccess(credentialResponse.credential); // For demonstration
    } catch (error) {
      console.error('Backend verification failed:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Google login failed');
  };

  return (
    <div>
      <h2>Sign in with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
}

export default GoogleLoginComponent;
