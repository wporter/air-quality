import "./globals.css";

export const metadata = {
  title: "Omega Initiative",
  description: "Air quality information you can trust.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
