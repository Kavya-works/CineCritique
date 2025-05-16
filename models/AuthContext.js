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

// models/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setUser(userData);
      } catch (error) {
        console.error('Error parsing JWT token:', error);
      }
    }
  }, []);

  const login = async (emailOrUsername, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setUser(userData);
        router.push('/');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred while logging in');
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setUser(userData);
        router.push('/');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed');
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred while signing up');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;