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

async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB database');

        // Use the testdb database
        const db = client.db(dbName);

        // Example operation: list collections
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections);

        // Example: Insert a document
        const collection = db.collection('news-articles');
        //const result = await collection.insertOne({header: 'Barcelona thrashes Real in the El Clasico', author: {username: 'burakkoc', firstname: 'Burak', lastname: 'Koc', verified: true}});
        const result = await collection.insertOne(
            {
                title: "Breaking: Major Development in Tech Industry",
                author: {
                    username: "burk",
                    firstname: "Burak",
                    lastname: "Koc",
                    verified: true,
                    email: "burak.koc@student.htldornbirn.at"
                },
                publicationDate: "2024-11-15T10:00:00Z",
                lastUpdated: "2024-11-15T12:30:00Z",
                category: "Technology",
                tags: ["Tech", "Innovation", "Breaking News"],
                summary: "A groundbreaking announcement in the tech industry is set to redefine the market landscape.",
                content: {
                    body: "In a surprising turn of events, a leading tech company has unveiled its latest innovation...",
                    media: [
                        {
                            type: "image",
                            url: "https://example.com/images/tech-breakthrough.jpg",
                            caption: "A prototype of the new technology unveiled at the conference."
                        },

                        {
                            type: "video",
                            url: "https://example.com/videos/tech-announcement.mp4",
                            caption: "Highlights from the announcement event."
                        }
                    ]
                },

                commentsEnabled: true,
                readTime: 3
            }
        )
        console.log('Inserted document:', result.insertedId);

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    } finally {
        // Close the connection
        await client.close();
        console.log('Connection closed');
    }
}

connectToDatabase();