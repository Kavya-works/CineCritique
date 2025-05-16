/********************************************************************************************
* WEB422 – Project
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Vercel URL: https://cine-critique-swart.vercel.app/
* Group member Name: Saeed Bafana, Peace Gbadamosi, Kavya Shah
* Student IDs: 146178223
* Date: 13 August 2024
*********************************************************************************************/

// pages/api/watchlist/add.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

if (process.env.NODE_ENV === 'development') {
  client = new MongoClient(uri);
} else {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(uri);
  }
  client = global._mongoClientPromise;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, movie } = req.body;

    try {
      const clientInstance = await client;
      const db = clientInstance.db('CineCritique');
      const watchlistCollection = db.collection('watchlist');

      const existingEntry = await watchlistCollection.findOne({ userId, 'movie.id': movie.id });
      if (existingEntry) {
        return res.status(400).json({ message: 'Movie already in watchlist' });
      }

      const result = await watchlistCollection.insertOne({ userId, movie });
      res.status(201).json({ message: 'Movie added to watchlist', result });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}