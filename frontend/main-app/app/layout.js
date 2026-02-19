import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "AI Brand-Influencer Platform",
    description: "AI-Powered Brand-Influencer Collaboration Platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-background font-sans antialiased">
                    {children}
                </div>
            </body>
        </html>
    );
}
