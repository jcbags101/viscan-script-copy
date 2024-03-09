/*
  layout.js
*/

"use client";

import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import { UserAuth } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const { user } = UserAuth();
  const isSignedIn = user !== null;

  return (
    <>
      {isSignedIn && <Navbar />}
      {children}
    </>
  );
}
