require('dotenv').config(); 

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'librarydb'
});

pool.connect()
    .then(() => console.log('✅ PostgreSQL Connected Successfully'))
    .catch(err => console.error('❌ Database Connection Error:', err.message));

module.exports = pool;

