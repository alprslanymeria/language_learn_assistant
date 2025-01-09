import "@/public/globals.css"
import NavbarComponent from "@/components/NavbarComponent"

export const metadata = {
  title: "Language Learn Assistant",
  description: "Made by Alparslan",
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div className="w-full">
            {children}
        </div>
      </body>
    </html>
  )
}