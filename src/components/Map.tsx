import React from "react";

const Map = ({ city }) => {
  const cityMaps = {
    "New York":
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1614799014016!5m2!1sen!2sus",
    "Los Angeles":
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1614799058082!5m2!1sen!2sus",
    Chicago:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858082378!2d-87.87204681640622!3d41.83390306762297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2sus!4v1614799114155!5m2!1sen!2sus",
    Seattle:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172139.0895319106!2d-122.48214643493939!3d47.61294318273676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2sus!4v1614799149080!5m2!1sen!2sus",
  };
  const addresses = {
    "New York": "20 W 34th St., New York, NY 10001",
    "Los Angeles": "900 Wilshire Blvd, Los Angeles, CA 90017",
    Chicago: "233 S Wacker Dr, Chicago, IL 60606",
    Seattle: "701 5th Ave, Seattle, WA 98104",
  };
  const hours = {
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
  const contacts = {
    "New York": ["Phone: (212) 428-3812"],
    Seattle: ["Phone: (206) 428-3812"],
    Chicago: ["Phone: (312) 428-3812"],
    "Los Angeles": ["Phone: (213) 428-3812"],
  };
  return (
    <>
      <div className="w-full h-[91%] flex space-x-5">
        <div className="h-full w-2/3">
          <h1 className="font-heading text-3xl text-text text-center">
            {city}
          </h1>

          <iframe
            src={cityMaps[city]}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`Map of ${city}`}
          ></iframe>
        </div>
        <div className="w-1/3 p-5 my-[5.4%] h-full text-left bg-primary h-autoflex">
          <div>
            <h1 className="text-2xl">Address:</h1>
            <h1>{addresses[city]}</h1>
          </div>
          <div>
            <h1 className="text-2xl">Hours:</h1>
            {hours[city].map((day, index) => (
              <h1 key={index}>{day}</h1>
            ))}
          </div>
          <div>
            <h1 className="text-2xl">Contact:</h1>
            {contacts[city].map((contact, index) => (
              <h1 key={index}>{contact}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
