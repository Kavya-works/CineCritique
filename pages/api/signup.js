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

//pages/api/signup.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const clientInstance = await clientPromise;
      const db = clientInstance.db('CineCritique');
      const users = db.collection('users');

      const existingUser = await users.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const lastUser = await users.find().sort({ userID: -1 }).limit(1).toArray();
      const newUserID = lastUser.length > 0 ? lastUser[0].userID + 1 : 1;

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await users.insertOne({ username, email, password: hashedPassword, userID: newUserID });

      // Generate JWT token
      const token = jwt.sign(
        { userID: newUserID, username, email },
        jwtSecret,
        { expiresIn: '1h' }
      );

      res.status(201).json({ message: 'User created', token });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}