import "./globals.css";
import Auth from "./hooks/Auth";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Omega Initiative",
  description: "Air quality information you can trust.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Auth>
          <Toaster />
          {children}
        </Auth>
      </body>
    </html>
  );
}
