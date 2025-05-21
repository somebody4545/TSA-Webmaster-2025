import React from 'react'
import Map from '@/components/Map'

const NewYork = () => {
	return (
		<Map
			city="New York, NY"
			address="20 W 34th St., New York, NY 10001"
			map="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo&q=20+W+34th+St.,+New+York,+NY+10001"
			hours={[
				"Sunday: 10:00 AM - 8:00 PM",
				"Monday: 8:00 AM - 10:30 PM",
				"Tuesday: 8:00 AM - 10:30 PM",
				"Wednesday: 8:00 AM - 10:30 PM",
				"Thursday: 8:00 AM - 10:30 PM",
				"Friday: 8:00 AM - 10:30 PM",
				"Saturday: 8:00 AM - 10:30 PM",
			]}
			contacts={["Phone: (212) 123-4567"]}
			thingsToDo={[
				{
					title: "Empire State Building",
					description: "Iconic Art Deco skyscraper with observation decks offering stunning city views.",
					distance: "0.1 miles away",
					image: "/img/attractions/empire-state-building.jpg"
				},
				{
					title: "Bryant Park",
					description: "Beautiful urban park with seasonal activities and a carousel.",
					distance: "0.3 miles away",
					image: "/img/attractions/bryant-park.jpg"
				},
				{
					title: "Times Square",
					description: "World-famous intersection known for its bright lights and entertainment.",
					distance: "0.4 miles away",
					image: "/img/attractions/times-square.jpg"
				},
				{
					title: "Herald Square",
					description: "Historic shopping district with Macy's flagship store and modern retail.",
					distance: "0.2 miles away",
					image: "/img/attractions/herald-square.jpg"
				}
			]}/>
	)
}

export default NewYork