// GoogleCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the "credential" token from the query parameters.
    const query = new URLSearchParams(location.search);
    const credential = query.get('credential');

    if (credential) {
      try {
        // Decode the JWT token to extract user info.
        const decoded = jwtDecode(credential);
        console.log('Decoded token:', decoded);
        // Use the user's name or email as the username.
        const username = decoded.name || decoded.email || 'GoogleUser';
        // Navigate to the dashboard with the user info.
        navigate('/dashboard', { state: { username } });
      } catch (error) {
        console.error('Error decoding credential:', error);
        // Redirect to login if there's an error.
        navigate('/login');
      }
    } else {
      // If no credential is found, send the user back to login.
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>Processing your login, please wait...</p>
    </div>
  );
}

export default GoogleCallback;
