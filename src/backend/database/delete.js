import { MongoClient } from 'mongodb';
import readline from 'readline'; // To prompt for user input
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_ARTICLES;

// Connection URI
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

// Helper function to prompt for input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function deleteDataById() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database
    const db = client.db(dbName);

    // Prompt user for collection name and document ID
    const collectionName = await askQuestion('Enter the collection name: ');
    const id = await askQuestion('Enter the document ID to delete: ');

    // Access the specified collection
    const collection = db.collection(collectionName);

    // Delete the document with the specified ID
    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      console.log(`Document with ID ${id} successfully deleted from ${collectionName}`);
    } else {
      console.log(`No document found with ID ${id} in ${collectionName}`);
    }

  } catch (err) {
    console.error('Error deleting data:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

deleteDataById();