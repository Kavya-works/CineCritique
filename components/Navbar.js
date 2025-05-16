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

// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../models/AuthContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <nav className="bg-[#1c1c1c] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <img src="https://cdn4.iconfinder.com/data/icons/smashicons-movies-flat/56/11_-_Ticket_Flat-256.png" alt="Logo" className="w-8 h-8" />
          <span>CineCritique</span>
        </Link>
        <form className="flex flex-1 mx-4" onSubmit={handleSearch}>
          <input
            className="px-3 py-1 rounded-l-lg border border-gray-700 bg-white text-black w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="px-3 py-1 bg-yellow-500 border border-yellow-500 rounded-r-lg text-gray-900 hover:bg-yellow-400 font-bold text-base" type="submit">
            Search
          </button>
        </form>
        <ul className="flex space-x-3 text-sm">
          <li>
            <Link href="/watchlist" className="hover:text-yellow-500 font-bold text-base">Watchlist</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-500 font-bold text-base">About Us</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-yellow-500 font-bold text-base">Contact</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={logout} className="hover:text-yellow-500 font-bold text-base">Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" className="hover:text-yellow-500 font-bold text-base">Sign Up</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-yellow-500 font-bold text-base">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;