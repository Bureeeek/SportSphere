import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

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

// Establish connection once when the server starts
client
  .connect()
  .then(() => {
    db = client.db(dbName);
    console.log("✅ Erfolgreich mit der MongoDB verbunden.");
  })
  .catch((error) => {
    console.error("❌ Fehler bei der Verbindung zur MongoDB:", error);
  });

app.get("/api/articles", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Keine Datenbankverbindung" });
    }

    const articles = await db.collection(collectionName).find().toArray();
    res.json(
      articles.map((article) => ({
        ...article,
       imageUrl: article.imageUrl || null, // Falls kein Bild existiert, bleibt es NULL
      }))
    );
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Artikel:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://10.110.48.248:${PORT}`);
});
