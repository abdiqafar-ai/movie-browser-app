import { AuthProvider } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Browser",
  description: "Discover and explore thousands of movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MyListProvider>{children}</MyListProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
