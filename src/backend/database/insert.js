// insert.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, GridFSBucket } from "mongodb";
import multer from "multer";
import { Readable } from "stream";
import path from "path";
import { Article, Author, Media } from "./materials/article.js"; // Importiere die Modelle

dotenv.config();

// MongoDB-Verbindungsdetails
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

// MongoDB client
const client = new MongoClient(uri);

// Route zum Erstellen eines Artikels mit Bild-Upload
app.post("/api/create-article", multer().array("media"), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    // Erstelle den Artikel ohne die Medien-URLs
    const articleData = new Article(
      req.body.title,
      new Author(
        req.body.authorUsername,
        req.body.authorFirstName,
        req.body.authorLastName,
        req.body.authorVerified,
        req.body.authorEmail
      ),
      req.body.publicationDate,
      req.body.lastUpdated,
      req.body.category,
      req.body.tags,
      req.body.summary,
      { body: req.body.contentBody, media: [] },
      req.body.commentsEnabled,
      req.body.readTime
    );

    // Füge den Artikel in die DB ein
    const result = await db.collection("news-articles").insertOne(articleData);

    // Bilder in GridFS hochladen und ihre IDs speichern
    for (let file of req.files) {
      const stream = Readable.from(file.buffer);
      const uploadStream = bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });

      // Datei in GridFS speichern
      stream.pipe(uploadStream);

      // Füge die ID des Bildes zum Artikel hinzu
      articleData.media.push(uploadStream.id);
    }

    // Artikel-Dokument mit den Bild-IDs aktualisieren
    await db
      .collection("news-articles")
      .updateOne(
        { _id: result.insertedId },
        { $set: { media: articleData.media } }
      );

    res.status(201).json({
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

// Server starten
app.listen(serverPort, () => {
  console.log(`Server running on http://localhost:${serverPort}`);
});
