// SignOutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/auth/signout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data.message);
      // Optionally, clear any client-side auth data.
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className="signout-button">
      Sign Out
    </button>
  );
}

export default SignOutButton;
