const pool = require('../config/db'); 

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        const result = await pool.query(
            'INSERT INTO Categories (name) VALUES ($1) RETURNING *',
            [name]
        );

        res.status(201).json({ 
            message: 'Category added successfully', 
            category: result.rows[0] 
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
