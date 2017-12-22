var mysql = require('mysql');
var express = require('express');
var app = express();

// Set up connection to database.
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db',
});

// Connect to database.
// connection.connect();

// Listen to POST requests to /users.
app.post('/users', function(req, res) {
  // Get sent data.
  var user = req.body;
  // Do a MySQL query.
  var query = connection.query('INSERT INTO users SET ?', user, function(err, result) {
    // Neat!
  });
  res.end('Success');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});