import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current user's data from your auth endpoint.
    // The credentials option ensures that the cookie is sent.
    fetch('/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((error) => console.error('Error fetching auth data:', error));
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">My App</Link>
      </div>
      <div className="auth-info">
        {user ? (
          <div className="signed-in">
            Signed in as {user.name || user.email}
            <SignOutButton />
          </div>
        ) : (
          <Link to="/login" className="login-link">Login / Signup</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
