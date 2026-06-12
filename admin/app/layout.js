import "./globals.css";

export const metadata = {
  title: "Moorland Admin",
  description: "Content and image management for Moorland House & SPA."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
