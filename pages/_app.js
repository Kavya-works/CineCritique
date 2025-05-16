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

// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../models/AuthContext';
import { WatchlistProvider } from '../context/WatchlistContext'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <WatchlistProvider> {}
        <Navbar />
        <Component {...pageProps} />
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default MyApp;