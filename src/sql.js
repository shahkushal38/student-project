// dbMiddleware.js
const mysql = require('mysql2/promise')
let connection;
mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'test'
}).then((conn) => {
  connection = conn;
  console.log('Connected to DB');
}).catch((err) => {
  console.error('Error connecting to DB:', err);
  process.exit(1);
});


// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to DB:', err);
//     process.exit(1); // Exit if connection fails
//   }
//   console.log('Connected to DB');
// });

const sql = (req, res, next) => {
  req.db = connection;
  next();
};

module.exports = sql;