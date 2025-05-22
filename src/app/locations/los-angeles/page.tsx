import React from 'react'
import Map from '@/components/Map'

const LosAngeles = () => {
  return (
    <Map
      city="Los Angeles, CA"
      address="900 Wilshire Blvd, Los Angeles, CA 90017"
      map="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo&q=900+Wilshire+Blvd,+Los+Angeles+CA+90017"
      hours={[
        "Sunday: 10:00 AM - 8:00 PM",
        "Monday: 8:00 AM - 10:30 PM",
        "Tuesday: 8:00 AM - 10:30 PM",
        "Wednesday: 8:00 AM - 10:30 PM",
        "Thursday: 8:00 AM - 10:30 PM",
        "Friday: 8:00 AM - 10:30 PM",
        "Saturday: 8:00 AM - 10:30 PM",
      ]}
      contacts={["Phone: (213) 123-4567"]}
      thingsToDo={[
        {
          title: "The Broad Museum",
          description: "Contemporary art museum featuring works by Warhol, Koons, and more.",
          distance: "0.4 miles away",
          image: "/img/attractions/broad-museum.png"
        },
        {
          title: "Walt Disney Concert Hall",
          description: "Stunning architectural masterpiece and home to the LA Philharmonic.",
          distance: "0.3 miles away",
          image: "/img/attractions/disney-concert-hall.png"
        },
        {
          title: "Grand Central Market",
          description: "Historic food hall featuring diverse local vendors and restaurants.",
          distance: "0.2 miles away",
          image: "/img/attractions/grand-central-market.png"
        },
        {
          title: "The Last Bookstore",
          description: "Iconic independent bookstore with unique architecture and rare books.",
          distance: "0.5 miles away",
          image: "/img/attractions/last-bookstore.png"
        }
      ]} />
  )
}

export default LosAngeles;