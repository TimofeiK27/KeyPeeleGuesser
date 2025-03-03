// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import './Home.css';

function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1>Welcome to the Game!</h1>
        <p>Click below to create a room and get started.</p>
        <Link to="/create-room" className="create-room-link">
          Create a Room
        </Link>
      </div>
    </div>
  );
}

export default Home;
