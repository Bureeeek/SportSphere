import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database successfully');
});



con.end((err) => {
    if (err) {
        console.error('Error closing the connection:', err);
    } else {
        console.log('Database connection closed');
    }
});