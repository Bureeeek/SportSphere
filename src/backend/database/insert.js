// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config();

// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ARTICLES;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

const app = express();
const serverPort = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB client
const client = new MongoClient(uri);

// Route to insert a news article
app.post('/api/create-article', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('news-articles');

        // Insert data
        const result = await collection.insertOne(req.body);
        res.status(201).json({ message: 'Article created successfully!', id: result.insertedId });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error creating article', error: err });
    } finally {
        await client.close();
    }
});

// Start server
app.listen(serverPort, () => {
    console.log(`Server running on http://localhost:${serverPort}`);
});
