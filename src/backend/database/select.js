import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;

// Connection URI
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

async function readAllData() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database
    const db = client.db(dbName);

    // Get all collections in the database
    const collections = await db.listCollections().toArray();

    // Iterate through each collection and retrieve all documents
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      
      console.log(`Reading data from collection: ${collectionName}`);
      const documents = await collection.find({}).toArray();

      console.log(`Documents in ${collectionName}:`, documents);
    }

  } catch (err) {
    console.error('Error reading data:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

readAllData();
