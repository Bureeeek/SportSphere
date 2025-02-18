// login.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const serverPort = 5600;

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

// Route: /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const accountsCollection = db.collection(collectionName);

    // Find user by email
    const user = await accountsCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({ message: 'Email not verified. Please verify your email to log in.' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Return the token and user information in JSON format
    res.status(200).json({
      token: user.userToken,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.myUsername
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});
