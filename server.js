const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const borrowRoutes = require('./routes/borrows');
const transactionRoutes = require('./routes/transactions');
const category = require('./routes/category'); 



app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrows', borrowRoutes);
app.use('/transactions', transactionRoutes);
app.use('/api', category); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
