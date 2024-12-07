import "@/public/globals.css";
import { Mitr , Markazi_Text , Neuton } from 'next/font/google';

const mitr = Mitr({
    subsets: ['latin'],
    weight: ['400', '500' ,'700'],
    display: 'swap',
})

const markazi = Markazi_Text({
  subsets: ['latin'],
  weight: ['400', '500' ,'700'],
  display: 'swap',
})

const neuton = Neuton({
  subsets: ['latin'],
  weight: ['400' ,'700'],
  display: 'swap',
})

export const metadata = {
  title: "Language Learn Assistant",
  description: "Made by Alparslan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container max-w-screen-xl mx-auto px-4">
        {children}
      </body>
    </html>
  );
}

export {mitr,  markazi , neuton};
