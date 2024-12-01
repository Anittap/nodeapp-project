const express = require('express');
const mysql = require('mysql2');

const app = express();

// Use the PORT environment variable or default to 5000 if not defined
const port = process.env.PORT || 5000;  // Default to 5000 if no PORT is set

// Create a connection to the MySQL database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Using environment variable for DB host
  user: process.env.DB_USER,  // Using environment variable for DB user
  password: process.env.DB_PASSWORD,  // Using environment variable for DB password
  database: process.env.DB_NAME  // Using environment variable for DB name
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database');
});

// Define an API endpoint to fetch data from the database
app.get('/', (req, res) => {
  const query = 'SELECT * FROM items';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error fetching data');
    } else {
      // Format the results into an HTML table
      let html = '<!DOCTYPE html><html><head><title>Data Table</title></head><body>';
      html += '<h1>Data from MySQL</h1>';
      html += '<table border="1" cellpadding="5" cellspacing="0">';
      html += '<tr>'; // Table headers
      Object.keys(results[0]).forEach(key => {
        html += `<th>${key}</th>`;
      });
      html += '</tr>';
      results.forEach(row => {
        html += '<tr>';
        Object.values(row).forEach(value => {
          html += `<td>${value}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      html += '</body></html>';

      res.send(html);
    }
  });
});

// Start the Node.js server using the port from environment variables
app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}`);
});
