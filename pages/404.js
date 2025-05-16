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

// pages/404.js
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Custom404 = () => {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col">
      <div className="flex-grow container mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Sorry, the page you&apos;re looking for cannot be found.</p>
        <Link href="/" className="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Custom404;