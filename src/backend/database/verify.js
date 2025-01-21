// verify.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const serverPort = 5700;

// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ACCOUNTS;
const collectionName = process.env.MONGO_COLLECTION_NAME_ACCOUNTS;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB client
const client = new MongoClient(uri);

// Route: /api/verify-email
app.get('/api/verify-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Verification token is required.' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const accountsCollection = db.collection(collectionName);

    // Find user by verification token
    const user = await accountsCollection.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token.' });
    }

    // Update the emailVerified field
    await accountsCollection.updateOne(
      { verificationToken: token },
      { $set: { emailVerified: true }, $unset: { verificationToken: "" } } // Remove token after verification
    );

    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (err) {
    console.error('Error during email verification:', err);
    res.status(500).json({ message: 'An error occurred during email verification. Please try again.' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});
