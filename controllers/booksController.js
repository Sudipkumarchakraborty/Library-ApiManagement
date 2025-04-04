const pool = require('../config/db');

exports.createBook = async (req, res) => {
    try {
        const { title, author, isbn, published_year, category, copies_available } = req.body;
        const result = await pool.query(
            'INSERT INTO Books (title, author, isbn, published_year, category, copies_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, isbn, published_year, category, copies_available]
        );
        res.status(201).json({ message: 'Book added successfy', book: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateBooks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, published_year, category, copies_available } = req.body;
        const result = await pool.query(
            'UPDATE Books SET title = $1, author = $2, isbn = $3, published_year = $4, category = $5, copies_available = $6 WHERE id = $7 RETURNING *',
            [title, author, isbn, published_year, category, copies_available, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully', updatedBook: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Books ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBooksById = async (req, res) => {
    try {
        const { id } = req.params; 

        if (id) {
            
            const result = await pool.query('SELECT * FROM Books WHERE id = $1', [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Book not found' });
            }

            return res.json(result.rows[0]); 
        }
        const result = await pool.query('SELECT * FROM Books ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM Books WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully', deletedBook: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
