import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 🌟 Fix für __dirname (richtiger Upload-Ordner)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ARTICLES;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

const app = express();
const serverPort = 5000;

app.use(cors());
app.use(bodyParser.json());

// 🌟 Fix für richtigen Upload-Ordner
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Bilder werden korrekt gespeichert
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🌟 Fix: Bilder als statische Dateien verfügbar machen
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const client = new MongoClient(uri);

// 🌟 API: Artikel mit Bild hochladen
app.post("/api/create-article", upload.single("media"), async (req, res) => {
  console.log("Speicherort der Datei:", req.file ? req.file.path : "KEIN BILD");

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("news-articles");

    // 🌟 Bild-URL speichern
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
      media: imageUrl ? [imageUrl] : [],
    };

    const result = await collection.insertOne(articleData);
    res.status(201).json({
      message: "Article created successfully!",
      id: result.insertedId,
      imageUrl: imageUrl,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error creating article", error: err });
  } finally {
    await client.close();
  }
});

// 🌟 Server starten
app.listen(serverPort, () => {
  console.log(`✅ Server läuft auf http://localhost:${serverPort}`);
});
