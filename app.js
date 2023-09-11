const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W@2915djkq#',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});