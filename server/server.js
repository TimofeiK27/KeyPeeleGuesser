// server.js
const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');

const socketIo = require('socket.io');
const cors = require('cors');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

const { findOrCreateUser } = require('./db');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const secret = process.env.JWT_SECRET || 'YOUR_SECRET_KEY'; // Use an environment variable in production

const server = http.createServer(app);

app.post('/auth/google', async (req, res) => {
  console.log("WRRR");
  try {
    // In production, verify the token using Google’s libraries.
    const token = req.body.token;
    const decoded = jwt.decode(token); // Replace with proper verification
    
    const { email, name } = decoded;
    if (!email) {
      return res.status(400).json({ error: 'Invalid token: email not found' });
    }
    
    // Check if the user exists; if not, add them.
    const userId = await findOrCreateUser(email, name);
    
    // Create a payload for your own JWT.
    const payload = { userId, email, name };
    
    // Sign a new token with your secret key.
    const authToken = jwt.sign(payload, secret, { expiresIn: '1h' });
    
    // Set the token in an HTTP-only cookie.
    res.cookie('token', authToken, {
      httpOnly: true,              // Prevents client-side JavaScript from accessing the cookie.
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production.
      maxAge: 3600000,             // Cookie expiration: 1 hour in milliseconds.
      sameSite: 'lax'              // Adjust based on your cross-site requirements.
    });
    
    // Respond with the userId (and any additional data as needed).
    res.json({ userId });
  } catch (error) {
    console.error('Error in /auth/google:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/auth/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ user: null });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json({ user: decoded });
  });
});

app.post('/auth/signout', (req, res) => {
  // Clear the cookie by setting it to an empty value and a past expiration date.
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Signed out successfully' });
});


server.listen(5556, () => {
  console.log("Server listening on port 5556");
});


const shutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close((err) => {
      if (err) {
        console.error('Error during shutdown', err);
        process.exit(1);
      }
      console.log('Server shut down.');
      process.exit(0);
    });
  };
  

  // Listen for termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);