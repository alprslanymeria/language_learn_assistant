import "@/public/globals.css";
import NavbarComponent from "./components/NavbarComponent";

export const metadata = {
  title: "Language Learn Assistant",
  description: "Made by Alparslan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      {/* <body className="container max-w-screen-xl mx-auto px-4">
        <NavbarComponent></NavbarComponent>
        {children}
      </body> */}
      <body>
        <div className="container max-w-screen-xl mx-auto px-4">
          <NavbarComponent></NavbarComponent>
        </div>
        <div className="w-full">
          {children}
        </div>
      </body>
    </html>
  );
}