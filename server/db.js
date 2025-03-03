const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "keypeeleapp"
});

async function findOrCreateUser(email, name) {
    try {
      // Check if the user already exists.
      const res = await pool.query('SELECT id FROM users WHERE username = $1', [email]);
      if (res.rows.length > 0) {
        return res.rows[0].id;
      } else {
        // Insert the new user and return the new id.
        const insertRes = await pool.query(
          'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
          [email, name]
        );
        return insertRes.rows[0].id;
      }
    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw error;
    }
  }

//   // Endpoint to sign up a new user (adds a user to the database)
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       // Hash the password before storing it
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const result = await pool.query(
//         'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
//         [username, hashedPassword]
//       );
//       res.status(201).json({ user: result.rows[0] });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error signing up user' });
//     }
//   });
  
//   // Endpoint to log in (authenticates a user from the database)
//   app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//       if (result.rows.length === 0) {
//         return res.status(400).json({ error: 'User not found' });
//       }
//       const user = result.rows[0];
//       // Compare provided password with the stored hashed password
//       const valid = await bcrypt.compare(password, user.password);
//       if (!valid) {
//         return res.status(400).json({ error: 'Incorrect password' });
//       }
//       res.status(200).json({ user });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error logging in user' });
//     }
//   });

module.exports = {
  pool,
  findOrCreateUser,
};