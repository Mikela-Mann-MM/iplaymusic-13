import "./globals.css";

export const metadata = {
  title: {
    template: "%s | IPlayMusic", //%s placeholder will be replaced by the page title defined in each page
    default: "IPlayMusic"
  },
  description: "A music sharing platform built with Next.js and TypeScript.",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
