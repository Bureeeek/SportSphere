// server.js (updated with /api/register)
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const serverPort = 5500;

// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ACCOUNTS;
const collectionName = process.env.MONGO_COLLECTION_NAME_ACCOUNTS
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB client
const client = new MongoClient(uri);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Helper function to send verification email
async function sendVerificationEmail(email, token) {    
  const verificationLink = `http://localhost:${serverPort}/api/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Verify Your Email Address',
    text: `Thank you for registering. Please verify your email by clicking the following link: ${verificationLink}`,
  };

  return transporter.sendMail(mailOptions);
}

// Route: /api/register
app.post('/api/register', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const accountsCollection = db.collection(collectionName);

    // Check if the email is already registered
    const existingUser = await accountsCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the user object
    const newUser = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerified: false,
      editorVerified: false,
      verificationToken,
    };

    // Insert the user into the database
    await accountsCollection.insertOne(newUser);

    // Send the verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'Registration successful! Please check your email for verification.' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});