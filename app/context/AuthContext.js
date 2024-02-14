/* 
    app/context/AuthContext.js
*/

"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { checkIfUserExists } from '../utils/userUtils';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const googleSignIn = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Sign-in result: ", result);
        const exists = await checkIfUserExists(result.user.email);
        console.log("Document data:", result.user.email);
        if (!exists) {
            console.log("User does not exist in the 'users' collection.");
            return { exist: false, user: result.user };
        }
        return { exist: true, user: result.user };
    }
    catch (error) {
        console.error("Error occurred during sign-in:", error);
        return { exist: false, user: user };
      }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser, googleSignIn, logOut, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};