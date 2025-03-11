import React from 'react';
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const locations = [
    { city: "New York" },
    { city: "Los Angeles" },
    { city: "Chicago" },
    { city: "San Francisco" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-900 text-white py-8 px-12">
      <div className="flex flex-row flex-wrap justify-between max-md:flex-col">
        <div className="flex flex-row flex-wrap max-md:flex-col">
          <div className="flex-shrink max-w-64 mr-8 mb-4">
            <h4 className="font-bold mb-2">Our Vision</h4>
            <p className="text-emerald-100 text-sm">
              At Maitso, we celebrate nature&apos;s bounty through thoughtfully crafted
              plant-based cuisine that nourishes both people and planet.
            </p>
          </div>

          <div className="mr-8 mb-4">
            <h4 className="font-bold mb-2">Find Us</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center">
                  <MapPin size={14} className="text-emerald-300 mr-1" />
                  <p>{location.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-bold mb-2">Connect With Us</h4>
          <div className="flex flex-row gap-1 mb-2">
            <Link href="/contact">
              <button className="text-sm font-bold text-emerald-300 bg-transparent border border-emerald-300 px-3 py-1 rounded-md hover:bg-emerald-700">
                Reserve
              </button>
            </Link>
            <div className="flex items-center">
              <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
            </div>
          </div>

          <div className="text-sm">
            <ContactInfo icon={<Mail size={14} />} text="hello@maitso.com" />
            <ContactInfo icon={<Phone size={14} />} text="+1 (123) 456-7890" />
          </div>
        </div>
      </div>

      <div className="w-full pt-2 mt-2 border-t border-emerald-600 text-xs text-emerald-200">
        © {currentYear} Maitso. All rights reserved.
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string, icon: React.ReactNode }> = ({ href, icon }) => (
  <Link href={href} className="text-white hover:text-emerald-300 mr-3">
    {icon}
  </Link>
);

const ContactInfo: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center mb-1">
    <span className="text-emerald-300 mr-1">{icon}</span>
    <p>{text}</p>
  </div>
);

export default Footer;