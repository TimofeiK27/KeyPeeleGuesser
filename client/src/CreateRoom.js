// CreateRoom.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoom.css';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const createRoom = (e) => {
    e.preventDefault();
    // Generate a roomId by removing spaces, converting to lowercase, and appending a random number.
    const roomId = `${roomName.replace(/\s+/g, '').toLowerCase()}-${Math.floor(Math.random() * 10000)}`;
    
    // Navigate to the room page with the roomId and username as query parameters.
    navigate(`/room/${roomId}?username=${username}`);
  };

  return (
    <div className="create-room-container">
      <h2>Create a New Room</h2>
      <form onSubmit={createRoom}>
        <div className="form-group">
          <label htmlFor="roomName">Room Name:</label>
          <input 
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Your Name:</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
