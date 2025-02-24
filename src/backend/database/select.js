import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// MongoDB Config
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ARTICLES;
const collectionName = process.env.MONGO_COLLECTION_NAME_ARTICLES;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri);
let db;

// Datenbankverbindung herstellen
client
  .connect()
  .then(() => {
    db = client.db(dbName);
    console.log("✅ Erfolgreich mit der MongoDB verbunden.");
  })
  .catch((error) => {
    console.error("❌ Fehler bei der Verbindung zur MongoDB:", error);
  });

// **ALLE Artikel abrufen**
app.get("/api/articles", async (req, res) => {
  try {
    if (!db)
      return res.status(500).json({ error: "Keine Datenbankverbindung" });

    const articles = await db.collection(collectionName).find().toArray();
    res.json(articles);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Artikel:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
  }
});

// **EINZELNEN Artikel abrufen**
app.get("/api/articles/:id", async (req, res) => {
  try {
    if (!db)
      return res.status(500).json({ error: "Keine Datenbankverbindung" });

    const articleId = req.params.id;

    // Überprüfen, ob die ID gültig ist
    if (!ObjectId.isValid(articleId)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }

    const article = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(articleId) });

    if (!article) {
      return res.status(404).json({ error: "Artikel nicht gefunden" });
    }

    res.json(article);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen des Artikels:", error);
    res.status(500).json({ error: "Fehler beim Abrufen des Artikels" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
});