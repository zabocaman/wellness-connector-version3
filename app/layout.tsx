import type { Metadata } from "next";
import "@/app/globals.css";
import { AppProvider } from "@/components/AppProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Wellness Connector",
    template: "%s · Wellness Connector",
  },
  description:
    "Discover local wellness experiences that match your energy, budget, and comfort level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
