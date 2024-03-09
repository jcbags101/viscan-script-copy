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
import {
  printUserEntries,
  checkIfUserExists,
  checkIfEmailExistsInCollections,
} from "../utils/userUtils";
import { saveUserInfo } from "@/api/user";

const AuthContext = createContext();

/**
 * AuthContextProvider component manages the authentication state.
 * It provides functions for signing in with Google, logging out, and access to the authentication state.
 * @param {Object} children - React components to be wrapped by the AuthContextProvider
 */
export const AuthContextProvider = ({ children }) => {
  // State to hold the current user
  const [user, setUser] = useState(null);
  // State to hold the loading status
  const [isLoading, setIsLoading] = useState(true);
  // Get the Firebase auth instance
  const auth = getAuth();

  const signIn = async (role, collection) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(`${role} sign-in result: `, result);
      const exists = await checkIfUserExists(result.user.email, collection);
      console.log("Document data:", result.user.email);
      console.log({ exists });
      if (!exists) {
        console.log(`User does not exist in the '${collection}' collection.`);
        // Save the user info in the collection
        await saveUserInfo(result.user, collection);
        console.log(`User info saved in the '${collection}' collection.`);
      }
      return { exist: true, user: result.user };
    } catch (error) {
      console.error(`Error occurred during ${role} sign-in:`, error);
      return { exist: false, user: null };
    }
  };

  const adminSignIn = () => signIn("Admin", "administrators");
  const staffSignIn = () => signIn("Staff", "manuscriptCheckingLibraryStaff");
  const formSignIn = () => signIn("Student", "students");

  // Function to log out
  const logOut = () => {
    signOut(auth);
  };

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, [auth]);

  // Provide the authentication state and functions to children components through context
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        adminSignIn,
        staffSignIn,
        formSignIn,
        logOut,
        auth,
        isLoading,
      }}
    >
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
