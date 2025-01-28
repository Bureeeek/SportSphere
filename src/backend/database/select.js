import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "sportsphere";
const collectionName = "news-articles";

app.get("/api/articles", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const articles = await db.collection(collectionName).find().toArray();

    res.json(
      articles.map((article) => ({
        ...article,
        imageUrl: article.imageUrl || null, // Falls kein Bild existiert, bleibt es NULL
      }))
    );
  } catch (error) {
    console.error("Fehler beim Abrufen der Artikel:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Artikel" });
  } finally {
    await client.close();
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
});
