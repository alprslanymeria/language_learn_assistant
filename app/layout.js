import "@/public/globals.css";


export const metadata = {
  title: "Language Learn Assistant",
  description: "Made by Alparslan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
