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
      <body className="overflow-x-hidden">
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
