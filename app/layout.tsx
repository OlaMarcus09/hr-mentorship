import './globals.css';
import type { Metadata } from 'next';
import { Inter, Calistoga } from 'next/font/google'; // Assuming fonts
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ChristmasSnow from "@/components/ChristmasSnow"; // New import

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
      <body className={`${inter.variable} ${calistoga.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ChristmasSnow /> {/* ❄️ Added Snow Effect ❄️ */}
          <Navbar />
          {children}
          
          {/* Simple Footer for context */}
          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-500 text-sm">© 2025 HR Mentorship. All rights reserved.</div>
                <div className="flex gap-6 text-slate-500">
                   <a href="#" className="hover:text-primary">Privacy Policy</a>
                   <a href="#" className="hover:text-primary">Terms of Service</a>
                </div>
             </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
