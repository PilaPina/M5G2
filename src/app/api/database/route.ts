export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function GET() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
        // ─── Trying to fix deployment server error ────────────────────────────────
    tls: true,                         // force TLS handshake
    // tlsAllowInvalidCertificates: true, // un-comment only if certs are self-signed
    // ssl: true,                         // alias for tls:true
    // sslValidate: false,                // alias for tlsAllowInvalidCertificates
  });

  try {
    await client.connect();
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    await client.close();
  }
}
