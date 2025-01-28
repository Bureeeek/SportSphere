import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

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

// __dirname für ES-Module simulieren
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// **Multer-Konfiguration für Datei-Upload**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Speichert die Bilder in "backend/database/uploads/"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// **Fix: Statische Route, um Bilder auszuliefern**
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// **Fix: API zum Hochladen von Bildern und Speichern in MongoDB**
app.post("/api/create-article", upload.single("media"), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("news-articles");

    // **Bild-URL generieren**
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : null;

    const articleData = {
      title: req.body.title,
      summary: req.body.summary,
      category: req.body.category,
      tags: req.body.tags ? req.body.tags.split(",") : [],
      content: req.body.content,
      publicationDate: new Date(),
      imageUrl: imageUrl, // **Speichert die Bild-URL in der Datenbank**
    };

    const result = await collection.insertOne(articleData);
    res.status(201).json({
      message: "Article created successfully!",
      id: result.insertedId,
      imageUrl: imageUrl, // **Gibt die URL zurück**
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error creating article", error: err });
  } finally {
    await client.close();
  }
});

// Server starten
app.listen(serverPort, () => {
  console.log(`✅ Server läuft auf http://localhost:${serverPort}`);
});
