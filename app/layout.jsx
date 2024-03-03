/*
  layout.js
*/
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ViscanScript",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className="shadow-md">
          {/* <Navbar /> */}
          </div>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
