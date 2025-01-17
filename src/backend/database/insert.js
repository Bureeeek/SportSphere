import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import multer from "multer";
import path from "path";

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

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Creates a unique filename
  },
});

const upload = multer({ storage: storage });

// MongoDB client
const client = new MongoClient(uri);

// Route to insert a news article with image upload
app.post("/api/create-article", upload.array("media"), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("news-articles");

    // Prepare data with image URLs
    const articleData = {
      ...req.body,
      media: req.files.map(
        (file) => `http://localhost:5000/uploads/${file.filename}`
      ), // Store the image URLs
    };

    // Insert data
    const result = await collection.insertOne(articleData);
    res
      .status(201)
      .json({
        message: "Article created successfully!",
        id: result.insertedId,
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error creating article", error: err });
  } finally {
    await client.close();
  }
});

// Serve static files (images)
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});
