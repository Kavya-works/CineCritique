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

// context/WatchlistContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async (userId) => {
    try {
      const response = await fetch(`/api/watchlist/${userId}`);
      const data = await response.json();
      setWatchlist(data.watchlist);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist, fetchWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);