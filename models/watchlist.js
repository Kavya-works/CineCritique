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

//models/watchlist.js
import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
  },
});

export default mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema);