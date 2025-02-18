import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const serverPort = 5500;
const verificationPort = 5700;
const jwtSecret = process.env.JWT_SECRET;

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
  const verificationLink = `http://10.110.84.248:${verificationPort}/api/verify-email?token=${token}`;
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
  const { myUsername, email, firstName, lastName, password } = req.body;

  if (!myUsername || !email || !firstName || !lastName || !password) {
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

    // Generate a JWT token for the user
    const userToken = jwt.sign({ email, myUsername }, jwtSecret, { expiresIn: '72h' });

    // Create the user object
    const newUser = {
      email,
      myUsername,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerified: false,
      editorVerified: false,
      verificationToken,
      userToken,
    };

    // Insert the user into the database
    await accountsCollection.insertOne(newUser);

    // Send the verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'Registration successful! Please check your email for verification.',
      token: userToken,
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'An error occurred during registration. Please try again.' });
  } finally {
    await client.close();
  }
});

// Route: Update user details (username, name, email, password)
app.put('/api/update-user', async (req, res) => {
  const { email, newUsername, newFirstName, newLastName, newPassword } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const accountsCollection = db.collection(collectionName);

    // Find the user by email
    const user = await accountsCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create update object
    let updateFields = {};
    if (newUsername) updateFields.myUsername = newUsername;
    if (newFirstName) updateFields.firstName = newFirstName;
    if (newLastName) updateFields.lastName = newLastName;
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.password = hashedPassword;
    }

    // Update user
    await accountsCollection.updateOne(
      { email },
      { $set: updateFields }
    );

    res.json({ message: "Account updated successfully!" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update account." });
  } finally {
    await client.close();
  }
}); 

app.post("/api/update-account", async (req, res) => {
  const { field, value } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const accountsCollection = db.collection(collectionName);

    // Find user by token
    const user = await accountsCollection.findOne({ userToken: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow valid fields
    const allowedFields = ["email", "username", "password", "name"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    // If updating password, hash it
    let updatedValue = value;
    if (field === "password") {
      updatedValue = await bcrypt.hash(value, 10);
    }

    // Update the field in MongoDB
    await accountsCollection.updateOne(
      { email: user.email },
      { $set: { [field]: updatedValue } }
    );

    res.json({ message: "Update successful!" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});