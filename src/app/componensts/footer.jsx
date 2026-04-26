import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import Socialbtn from "./socialbtn";
import PaymentIcons from "./paymentIcons";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:max-w-[1480px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start items-center">

              <span className="text-xl font-bold">Zalvox</span>
            </div>
            <p className="text-gray-400 text-sm">
              Since 2007, Zalvox has offered elegant, high-quality watches
              without the luxury markup.
            </p>
            <div className="mt-2">
              <PaymentIcons />
            </div>
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              <Socialbtn />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: "Home", href: "/" },
                { label: "Collection", href: "#product" },
                { label: "Track your order", href: "/tracking" },
                { label: "Contact", href: "/contact" },
                { label: "About us", href: "/about" },
                { label: "Login", href: "/login" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-500 transition duration-300 hover:translate-x-1 flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "Custom Watch Design",
                "Gift Packaging",
                "Warranty Services",
                "Global Shipping",
                "Customer Support",
              ].map((service) => (
                <li key={service}>
                  <span className="hover:text-white transition duration-300 flex items-center">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">Our Location</h3>
            <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden p-4 sm:p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.459100813562!2d67.1192706!3d24.984511299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3471635262377%3A0xc61b99dd36c0d0ac!2sSaddar%20Market%20Society%20Sector%206%20A%20Gulzar%20E%20Hijri%20Scheme%2033%2C%20Karachi!5e0!3m2!1sen!2s!4v1750387793082!5m2!1sen!2s"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            © 2025 Zalvox. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
