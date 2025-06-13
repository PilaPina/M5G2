export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Get MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI as string;
if (!uri) {
  // Throw an error if the connection string is missing
  throw new Error('MONGODB_URI environment variable is not set');
}

// API route handler for GET requests
export async function GET() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    // Fetch all documents from the "FunMix" collection in the "WordSalad" database
    const word = await client
      .db("WordSalad")
      .collection("FunMix")
      .find({})
      .toArray();

    // Map to only include the word field
    const wordArr = word.map(g => ({
      word: g.word,
    }));

    return NextResponse.json({
      message: "Yes! You are connected to MongoDB!",
      words: wordArr,
    });
  } catch (error) {
    // Handle errors and return a 500 response with the error message
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    // Always close the MongoDB client connection
    await client.close();
  }
}
