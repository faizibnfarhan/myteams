import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';


import { Toaster } from "@/components/ui/toaster";

const poppin = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "MyTeams",
  description: "A enterprise ready free meeting platform made for teams to communication. A project showcase by Muhammad Faiz Khan, a software developer based in sydney.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/dashboard"  afterSignUpUrl="/dashboard">
      <html lang="en">
        <body className={`${poppin.className} bg-dark-2`}>
          {children}
          <Toaster style=""/>
        </body>
      </html>   
    </ClerkProvider>
    
  );
}
