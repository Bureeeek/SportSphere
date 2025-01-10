import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION_NAME;

const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

const app = express();

// Enable CORS for all routes
app.use(cors()); // Default: allows all origins

// Route to fetch articles
app.get('/api/articles', async (req, res) => {
  let client;

  try {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const articles = await db.collection(collectionName).find().toArray();

    console.log('Fetched Articles:', articles); // Log the fetched data
    res.json(
      articles.map(article => ({
        ...article,
        tags: article.tags || [], // Ensure tags is always an array
        publicationDate: article.publicationDate || null, // Ensure publicationDate is always present
      }))
    );
    
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});