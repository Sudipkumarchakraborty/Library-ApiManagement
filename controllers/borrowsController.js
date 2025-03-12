const pool = require('../config/db');

exports.borrowBook = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        const borrow_date = new Date();
        const return_date = new Date();
        return_date.setDate(return_date.getDate() + 14); // Default return period is 14 days.

        // Check if book exists and is available
        const bookCheck = await pool.query('SELECT copies_available FROM Books WHERE id = $1', [book_id]);
        if (bookCheck.rowCount === 0) return res.status(404).json({ message: 'Book not found' });

        if (bookCheck.rows[0].copies_available < 1) {
            return res.status(400).json({ message: 'No copies available for borrowing' });
        }

        // Insert borrowing record
        const result = await pool.query(
            'INSERT INTO Borrowed_Books (user_id, book_id, borrow_date, return_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, book_id, borrow_date, return_date, 'Borrowed']
        );

        // Reduce available copies of the book
        await pool.query('UPDATE Books SET copies_available = copies_available - 1 WHERE id = $1', [book_id]);

        res.status(201).json({ message: 'Book borrowed successfully', borrow: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { id } = req.params;
        const borrowCheck = await pool.query('SELECT * FROM Borrowed_Books WHERE id = $1 AND status = $2', [id, 'Borrowed']);
        if (borrowCheck.rowCount === 0) {
            return res.status(404).json({ message: 'Borrow record not found or already returned' });
        }

        const bookId = borrowCheck.rows[0].book_id; // Get book_id from the borrow record

        // Update the borrow status to "Returned"
        const result = await pool.query(
            'UPDATE Borrowed_Books SET status = $1 WHERE id = $2 RETURNING *',
            ['Returned', id]
        );

        // Increase the available copies of the book
        await pool.query('UPDATE Books SET copies_available = copies_available + 1 WHERE id = $1', [bookId]);

        res.json({ message: 'Book returned successfully', updatedBorrow: result.rows[0] });
    } catch (error) {
        console.error(error); // Log for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
