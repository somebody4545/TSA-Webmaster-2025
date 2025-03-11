import React from "react";

interface MapProps {
  city: string;
}

const Map: React.FC<MapProps> = ({ city }) => {
  const API_KEY = "AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo";
  const addresses: { [key: string]: string } = {
    "New York": "20 W 34th St., New York, NY 10001",
    "Los Angeles": "900 Wilshire Blvd, Los Angeles, CA 90017",
    Chicago: "233 S Wacker Dr, Chicago, IL 60606",
    Seattle: "701 5th Ave, Seattle, WA 98104",
  };

  const cityMaps: { [key: string]: string } = {
    "New York": `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(
      addresses["New York"]
    )}`,
    "Los Angeles": `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&&q=${encodeURIComponent(
      addresses["Los Angeles"]
    )}`,
    Chicago: `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&&q=${encodeURIComponent(
      addresses["Chicago"]
    )}`,
    Seattle: `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&&q=${encodeURIComponent(
      addresses["Seattle"]
    )}`,
  };

  const hours: { [key: string]: string[] } = {
    "New York": [
      "Sunday: 10:00 AM - 8:00 PM",
      "Monday: 8:00 AM - 10:30 PM",
      "Tuesday: 8:00 AM - 10:30 PM",
      "Wednesday: 8:00 AM - 10:30 PM",
      "Thursday: 8:00 AM - 10:30 PM",
      "Friday: 8:00 AM - 10:30 PM",
      "Saturday: 8:00 AM - 10:30 PM",
    ],
    Seattle: [
      "Sunday: 10:00 AM - 8:00 PM",
      "Monday: 8:00 AM - 10:30 PM",
      "Tuesday: 8:00 AM - 10:30 PM",
      "Wednesday: 8:00 AM - 10:30 PM",
      "Thursday: 8:00 AM - 10:30 PM",
      "Friday: 8:00 AM - 10:30 PM",
      "Saturday: 8:00 AM - 10:30 PM",
    ],
    Chicago: [
      "Sunday: 10:00 AM - 8:00 PM",
      "Monday: 8:00 AM - 10:30 PM",
      "Tuesday: 8:00 AM - 10:30 PM",
      "Wednesday: 8:00 AM - 10:30 PM",
      "Thursday: 8:00 AM - 10:30 PM",
      "Friday: 8:00 AM - 10:30 PM",
      "Saturday: 8:00 AM - 10:30 PM",
    ],
    "Los Angeles": [
      "Sunday: 10:00 AM - 8:00 PM",
      "Monday: 8:00 AM - 10:30 PM",
      "Tuesday: 8:00 AM - 10:30 PM",
      "Wednesday: 8:00 AM - 10:30 PM",
      "Thursday: 8:00 AM - 10:30 PM",
      "Friday: 8:00 AM - 10:30 PM",
      "Saturday: 8:00 AM - 10:30 PM",
    ],
  };

  const contacts: { [key: string]: string[] } = {
    "New York": ["Phone: (212) 428-3812"],
    Seattle: ["Phone: (206) 428-3812"],
    Chicago: ["Phone: (312) 428-3812"],
    "Los Angeles": ["Phone: (213) 428-3812"],
  };

  const mapSrc = cityMaps[city] || "https://www.google.com/maps";
  const address = addresses[city] || "Address not available";
  const cityHours = hours[city] || ["Hours not available"];
  const cityContacts = contacts[city] || ["Contact information not available"];

  return (
    <>
      <h1 className="font-heading text-3xl text-text text-center">{city}</h1>
      <div className="w-full h-[91%] flex space-x-5">
        <div className="h-full w-2/3">
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
        <div className="w-1/3 p-5 h-full text-left bg-primary h-autoflex">
          <div>
            <h1 className="text-2xl">Address:</h1>
            <h1>{address}</h1>
          </div>
          <div>
            <h1 className="text-2xl">Hours:</h1>
            {cityHours.map((day, index) => (
              <h1 key={index}>{day}</h1>
            ))}
          </div>
          <div>
            <h1 className="text-2xl">Contact:</h1>
            {cityContacts.map((contact, index) => (
              <h1 key={index}>{contact}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
