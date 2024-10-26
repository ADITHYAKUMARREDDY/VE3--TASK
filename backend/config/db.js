const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'adithya', 
  database: 'taskdb', 
  port: 3306 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
