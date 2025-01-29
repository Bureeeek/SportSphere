require("dotenv").config();
import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();
const serverPort = 5800;


// MongoDB connection details
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME_VERIFICATION;
const collectionName = process.env.MONGO_COLLECTION_NAME_VERIFICATION;
const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin`;

app.use(cors());
app.use(json());

const client = new MongoClient(uri);

const VerificationSchema = new Schema({
  selectedPlatforms: [String],
  handles: Object,
  reason: String,
  articles: String,
  status: { type: String, default: "Pending" }, // "Pending", "Approved", "Rejected"
});

const Verification = model("Verification", VerificationSchema);

// Handle Form Submission
app.post("/api/verify-user", async (req, res) => {
  const { selectedPlatforms, handles, reason, articles } = req.body;

  try {
    const verification = new Verification({
      selectedPlatforms,
      handles,
      reason,
      articles,
    });

    await verification.save();
    res.status(201).json({ message: "Verification request submitted" });
  } catch (error) {
    res.status(500).json({ message: "Error saving verification request" });
  }
});

// Get all verification requests
app.get("/api/verify-user", async (req, res) => {
  try {
    const requests = await Verification.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Approve or Reject a Request
app.put("/api/verify-user/:id", async (req, res) => {
  const { status } = req.body;
  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    await Verification.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Request marked as ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});

// Start the server
app.listen(serverPort, () => {
    console.log(`Server running on http://localhost:${serverPort}`);
  });