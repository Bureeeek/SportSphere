// select.js

import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Article, Author, Media } from "./materials/article.js"; // Importiere das Artikel-Modell

dotenv.config();

// MongoDB-Verbindungsdetails
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ARTICLES;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

const app = express();
const serverPort = 5001;

// MongoDB client
const client = new MongoClient(uri);

// Route zum Abrufen von Artikeln
app.get("/api/articles", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    // Hole alle Artikel aus der Datenbank
    const articles = await db.collection("news-articles").find().toArray();

    // Gebe die Artikel-Daten als JSON zurück
    res.json(
      articles.map((article) => ({
        ...article,
        media: Array.isArray(article.media) ? // Prüfe, ob 'media' ein Array ist
          article.media.map((mediaId) => {
            return {
              type: "image", // Hier für Bilder, kann bei Bedarf erweitert werden
              url: `http://localhost:5000/api/media/${mediaId}`, // Die URL für das Bild
              caption: "Image Caption", // Beispiel-Untertitel
            };
          }) : [], // Falls 'media' nicht existiert, leere Liste verwenden
      }))
    );
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  } finally {
    await client.close();
  }
});


// Server starten
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});
