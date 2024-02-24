/**
 * context/AuthContext.js
 * 
 * This file defines the AuthContext and AuthContextProvider components,
 * which manage authentication state using Firebase Authentication in a React application.
 * TODO: Currently set up for admin, do also for student's form
 */

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { checkIfUserExists } from "../utils/userUtils";

// Create a context for managing authentication state
const AuthContext = createContext();

/**
 * AuthContextProvider component manages the authentication state.
 * It provides functions for signing in with Google, logging out, and access to the authentication state.
 * @param {Object} children - React components to be wrapped by the AuthContextProvider
 */
export const AuthContextProvider = ({ children }) => {
  // State to hold the current user
  const [user, setUser] = useState(null);
  // Get the Firebase auth instance
  const auth = getAuth();

  // Function to sign in with Google
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in result: ", result);
      // Check if user exists in database
      const exists = await checkIfUserExists(result.user.email);
      console.log("Document data:", result.user.email);
      if (!exists) {
        console.log("User does not exist in the 'users' collection.");
        return { exist: false, user: result.user };
      }
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      // Handle errors
      return { exist: false, user: null };
    }
  };

  // Function to log out
  const logOut = () => {
    signOut(auth);
  };

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, [auth]);

  // Provide the authentication state and functions to children components through context
  return (
    <AuthContext.Provider value={{ user, setUser, googleSignIn, logOut, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication state and functions.
 * @returns {Object} - Object containing authentication state and functions
 */
export const UserAuth = () => {
  return useContext(AuthContext);
};
