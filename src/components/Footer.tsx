import React from 'react';
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-green-900 text-white py-8 px-12 flex flex-row flex-wrap max-md:flex-col">
            <div className="flex-shrink max-w-64 mr-8 mb-4">
                <h4 className="font-bold mb-2">Our Vision</h4>
                <p className="text-emerald-100 text-sm">
                    At Maitso, we celebrate nature's bounty through thoughtfully crafted 
                    plant-based cuisine that nourishes both people and planet.
                </p>
            </div>
            
            <div className="mr-8 mb-4">
                <h4 className="font-bold mb-2">Find Us</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center">
                        <MapPin size={14} className="text-emerald-300 mr-1" />
                        <p>New York</p>
                    </div>
                    <div className="flex items-center">
                        <MapPin size={14} className="text-emerald-300 mr-1" />
                        <p>Los Angeles</p>
                    </div>
                    <div className="flex items-center">
                        <MapPin size={14} className="text-emerald-300 mr-1" />
                        <p>Chicago</p>
                    </div>
                    <div className="flex items-center">
                        <MapPin size={14} className="text-emerald-300 mr-1" />
                        <p>San Francisco</p>
                    </div>
                </div>
            </div>
            
            <div className="flex-grow mb-4">
                <h4 className="font-bold mb-2">Connect With Us</h4>
                <div className="flex flex-row gap-4 mb-2">
                    <Link href="/contact">
                        <button className="text-sm font-bold text-emerald-300 bg-transparent border border-emerald-300 px-3 py-1 rounded-md hover:bg-emerald-700">
                            Reserve
                        </button>
                    </Link>
                    <div className="flex items-center">
                        <Link href="https://facebook.com" className="text-white hover:text-emerald-300 mr-3">
                            <Facebook size={20} />
                        </Link>
                        <Link href="https://instagram.com" className="text-white hover:text-emerald-300 mr-3">
                            <Instagram size={20} />
                        </Link>
                        <Link href="https://twitter.com" className="text-white hover:text-emerald-300">
                            <Twitter size={20} />
                        </Link>
                    </div>
                </div>
                
                <div className="text-sm">
                    <div className="flex items-center mb-1">
                        <Mail size={14} className="text-emerald-300 mr-1" />
                        <p>hello@maitso.com</p>
                    </div>
                    <div className="flex items-center">
                        <Phone size={14} className="text-emerald-300 mr-1" />
                        <p>+1 (123) 456-7890</p>
                    </div>
                </div>
            </div>
            
            <div className="w-full pt-2 mt-2 border-t border-emerald-600 text-xs text-emerald-200">
                © {new Date().getFullYear()} Maitso. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;