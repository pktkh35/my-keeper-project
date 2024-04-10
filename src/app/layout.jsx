import "./globals.css";
import SessionProvider from "@/components/Provider/Session";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "My Keeper",
  description: "We help you manage task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Athiti&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SessionProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: '4px'
              }
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
