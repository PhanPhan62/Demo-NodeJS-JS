const mysql = require('mysql');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W@2915djkq#',
    database: 'mydb'
});

// Create a new user
exports.createUser = (req, res) => {
    const { username, password, role } = req.body;
    const newUser = { username, password, role };

    db.query('INSERT INTO users SET ?', newUser, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        } else {
            res.status(201).json({ message: 'User created successfully', data: newUser });
        }
    });
};

// Read all users
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        } else {
            res.status(200).json({ data: results });
        }
    });
};

// Read a single user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    db.query('SELECT * FROM users WHERE id = ?', userId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving user', error: err });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ data: results[0] });
            }
        }
    });
};

// Update a user by ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    db.query(
        'UPDATE users SET username = ?, password = ?, role =? WHERE id = ?', [username, password, role, userId],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error updating user', error: err });
            } else {
                res.status(200).json({ message: 'User updated successfully' });
            }
        }
    );
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', userId, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting user', error: err });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
};