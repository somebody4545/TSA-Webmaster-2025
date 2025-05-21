import React from 'react'
import Map from '@/components/Map'

const Chicago = () => {
  return (
    <Map
      city="Chicago, IL"
      address="233 S Wacker Dr, Chicago, IL 60606"
      map="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo&q=233+S+Wacker+Dr,+Chicago,+IL+60606"
      hours={[
        "Sunday: 10:00 AM - 8:00 PM",
        "Monday: 8:00 AM - 10:30 PM",
        "Tuesday: 8:00 AM - 10:30 PM",
        "Wednesday: 8:00 AM - 10:30 PM",
        "Thursday: 8:00 AM - 10:30 PM",
        "Friday: 8:00 AM - 10:30 PM",
        "Saturday: 8:00 AM - 10:30 PM",
      ]}
      contacts={["Phone: (312) 123-4567"]}
      thingsToDo={[
        {
          title: "Willis Tower Skydeck",
          description: "Experience breathtaking views of Chicago from the 103rd floor observation deck.",
          distance: "0.2 miles away",
          image: "/img/attractions/willis-tower.jpg"
        },
        {
          title: "Art Institute of Chicago",
          description: "World-renowned art museum featuring works from ancient to contemporary.",
          distance: "0.8 miles away",
          image: "/img/attractions/art-institute.jpg"
        },
        {
          title: "Millennium Park",
          description: "Home to the iconic Cloud Gate sculpture and beautiful outdoor spaces.",
          distance: "0.5 miles away",
          image: "/img/attractions/millennium-park.jpg"
        },
        {
          title: "Chicago Riverwalk",
          description: "Scenic walkway along the Chicago River with restaurants and activities.",
          distance: "0.3 miles away",
          image: "/img/attractions/riverwalk.jpg"
        }
      ]} />
  )
}

export default Chicago;