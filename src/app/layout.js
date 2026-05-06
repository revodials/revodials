import { Outfit } from "next/font/google";
import "./globals.css";
import CartProvider from "@/lib/cart-context";
import ClientWrapper from "./componensts/clientwrapper";
import FacebookPixel from "./componensts/FacebookPixel";



const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // optional custom CSS variable
  weight: ["400", "500", "600", "700"], // choose weights as needed
});

export const metadata = {
  applicationName: "Revodials",
  title: {
    default: "Revodials - Your Ultimate Shopping Destination",
    template: "Revodials - Your Ultimate Shopping Destination",
  },
  description: "Revodials - Your Ultimate Shopping Destination",
  icons: {
    icon: "/Revodials-siteicon.png", // Path to your favicon in /public
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Revodials - Your Ultimate Shopping Destination",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Revodials",
    title: {
      default: "Revodials - Your Ultimate Shopping Destination",
      template: "Revodials - Your Ultimate Shopping Destination",
    },
    description: "Revodials - Your Ultimate Shopping Destination",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Revodials - Your Ultimate Shopping Destination",
      template: "Revodials - Your Ultimate Shopping Destination",
    },
    description: "Revodials - Your Ultimate Shopping Destination",
  },
};


export const viewport = {
  themeColor: "#FFFFFF",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* <meta name="facebook-domain-verification" content="7bb615550qvm6ipgecz81nuzc3bb3k" /> */}
        <FacebookPixel />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ClientWrapper>
          <CartProvider>{children}</CartProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
