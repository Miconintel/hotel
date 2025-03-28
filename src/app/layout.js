import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "@/components/Header";
import { ReservationProvider } from "@/components/ReservationContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The wild oasis",
    default: "Welcome to the wild oasis",
  },
  description: "Luxurious cabin hotel, located in the heart of Italy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
