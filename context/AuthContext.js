/*
 * context/AuthContext.js
 * This file defines the AuthContext and AuthContextProvider components,
 * which manage authentication state using Firebase Authentication in a React application.
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
import { printUserEntries, checkIfUserExists, checkIfEmailExistsInCollections } from "../utils/userUtils";

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

  // Function to sign in with Google for admin
  const adminSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      console.log("Admin sign-in result: ", result);
      // Check if user exists in admin collection
      const exists = await checkIfUserExists(result.user.email, "administrator");
      console.log("Document data:", result.user.email);
      if (!exists) {
        console.log("User does not exist in the 'administrator' collection.");
        return { exist: false, user: result.user };
      }
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during admin sign-in:", error);
      // Handle errors
      return { exist: false, user: null };
    }
  };

  // Function to sign in with Google for staff
  const staffSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      console.log("Staff sign-in result: ", result);
      // Check if user exists in manuscriptCheckingStaff collection
      const exists = await checkIfUserExists(result.user.email, "manuscriptCheckingLibraryStaff");
      console.log("Document data:", result.user.email);
      printUserEntries("manuscriptCheckingLibraryStaff");
      if (!exists) {
        console.log("User does not exist in the 'manuscriptCheckingLibraryStaff' collection.");
        return { exist: false, user: result.user };
      }
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during staff sign-in:", error);
      // Handle errors
      return { exist: false, user: null };
    }
  };

  // Function to sign in with Google for student
  const bindingFormSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      console.log("Student sign-in result: ", result);
      // Check if user exists in multiple collections (passed as an array)
      const collectionsToCheck = ["collection1", "collection2", "collection3"]; // Add your collections here
      const exists = await checkIfEmailExistsInCollections(result.user.email, collectionsToCheck);
      console.log("Document data:", result.user.email);
      if (!exists) {
        console.log("User does not exist in any of the specified collections.");
        return { exist: false, user: result.user };
      }
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during student sign-in:", error);
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
    <AuthContext.Provider value={{ user, setUser, adminSignIn, staffSignIn, bindingFormSignIn, logOut, auth }}>
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
