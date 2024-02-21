/*
    components/Navbar.jsx
    houses navigation and login/signup buttons
*/

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const { user, setUser, googleSignIn, logOut, auth } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const userData = await googleSignIn(); // Using googleSignIn function from
      console.log("Signing in...", userData);
      console.log("User data after signing in:", userData);
      // if (!userData.exist) {
      //   console.log(
      //     "User does not exist in database. Redirecting to registration form...:",
      //     userData,
      //   );
      //   await logOut();
      //   router.push(
      //     `/dashboard/registration-form?email=${userData.user.email}`,
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]); //

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>

        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {!user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign in with Google
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
