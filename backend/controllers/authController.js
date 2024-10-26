const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
exports.register = (req, res) => {
  const { name, username, password, confirmPassword } = req.body;
  if (!name || !username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err);
      return res.status(500).json({ error: 'Database error while checking username' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      db.query(
        'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
        [name, username, hash],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error while creating user' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error during password validation' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Logged in', token });
    });
  });
};
