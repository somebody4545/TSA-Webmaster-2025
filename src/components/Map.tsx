"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface MapProps {
  city: string;
  address: string;
  map: string;
  hours: string[];
  contacts: string[];
}

const Map: React.FC<MapProps> = ({ city, address, map, hours, contacts }) => {
  const mapSrc = map || "https://www.google.com/maps";
  const addressNew = address || "Address not available";
  const cityHours = hours || ["Hours not available"];
  const cityContacts = contacts || ["Contact information not available"];
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex items-center text-lg text-text px-8 py-8"
      >
        <ChevronLeft className="mr-2" /> Back to Locations
      </button>
      <div className="w-full flex flex-col lg:flex-row gap-8 px-8 pb-8">
        <div className="w-full lg:w-2/3 h-96 lg:h-auto">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`Map of ${city}`}
          ></iframe>
        </div>
        <div className="w-full lg:w-1/3 p-5 text-left bg-primary rounded-lg">
          <h1 className="font-heading text-3xl text-text text-center mb-4">
            {city}
          </h1>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Hours:</h2>
            {cityHours.map((day, index) => (
              <p key={index}>{day}</p>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Address:</h2>
            <p>{addressNew}</p>
            <Link
              className="underline"
              target="_blank"
              href={`https://www.google.com/maps/place/${addressNew}`}
            >
              Visit on Google Maps
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Contact:</h2>
            {cityContacts.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;