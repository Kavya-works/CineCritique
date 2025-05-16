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

// lib/mongodb.js
import mongoose from 'mongoose';

const connection = {}; 

async function connectDB() {
  if (connection.isConnected) {
    return; 
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;