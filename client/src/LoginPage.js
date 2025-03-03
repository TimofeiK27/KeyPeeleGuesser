import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginComponent from './GoogleLoginComponent';
import './LoginPage.css';

function LoginPage() {
  // isSignup controls whether the form is in signup or login mode.
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission for login or signup.
  const handleSubmit = (e) => {
    e.preventDefault();
    // You would add your login or signup API calls here.
    // For now, we simply navigate to a dashboard with the username.
    console.log(`${isSignup ? 'Signing up' : 'Logging in'} with`, username, password);
    navigate('/', { state: { username } });
  };

  // Toggle between login and signup modes.
  const toggleMode = () => {
    setIsSignup((prev) => !prev);
  };

  // Handle Google login success (you can extend this with actual verification).
  const handleGoogleLoginSuccess = (credential) => {
    // Optionally decode the credential token to get user info.
    navigate('/', { state: { username: 'GoogleUser' } });
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <button onClick={toggleMode} className="toggle-button">
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
      </button>
      <div className="divider">
        <span>OR</span>
      </div>
      <GoogleLoginComponent onLoginSuccess={handleGoogleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
