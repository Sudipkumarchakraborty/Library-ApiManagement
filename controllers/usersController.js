const pool = require('../config/db');

exports.createUsers = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }
        const result = await pool.query(
            'INSERT INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, password, role || 'Member']
        );
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body; 

        const result = await pool.query(
            'UPDATE Users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
            [name, email, password, role, id] 
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', updatedUser: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, role FROM Users ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT id, name, email, role FROM Users WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
