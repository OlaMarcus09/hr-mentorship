import './globals.css';
import type { Metadata } from 'next';
import { Inter, Calistoga } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ChristmasSnow from "@/components/ChristmasSnow";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'HR Mentorship',
  description: 'Where HR Careers Grow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* flex-col and min-h-screen ensure the footer is always pushed to the bottom */}
      <body className={`${inter.variable} ${calistoga.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ChristmasSnow />
          <Navbar />
          
          {/* Main Content: flex-1 pushes the footer down if content is short */}
          <main className="flex-1 w-full">
            {children}
          </main>
          
          {/* Footer: Stays at the bottom */}
          <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 px-6 mt-auto z-40 relative">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-500 dark:text-slate-400 text-sm">
                  © 2025 HR Mentorship. All rights reserved.
                </div>
                <div className="flex gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                   <a href="#" className="hover:text-primary transition">Privacy Policy</a>
                   <a href="#" className="hover:text-primary transition">Terms of Service</a>
                </div>
             </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
