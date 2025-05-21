import React from 'react'
import Map from '@/components/Map'

const Seattle = () => {
	return (
		<Map
			city="Seattle, WA"
			address="701 5th Ave, Seattle, WA 98104"
			map="https://www.google.com/maps/embed/v1/place?key=AIzaSyD7T3QffKqS2HdHVFbBgRes-mN93cat3Lo&q=701+5th+Ave,+Seattle,+WA+98104"
			hours={[
				"Sunday: 10:00 AM - 8:00 PM",
				"Monday: 8:00 AM - 10:30 PM",
				"Tuesday: 8:00 AM - 10:30 PM",
				"Wednesday: 8:00 AM - 10:30 PM",
				"Thursday: 8:00 AM - 10:30 PM",
				"Friday: 8:00 AM - 10:30 PM",
				"Saturday: 8:00 AM - 10:30 PM",
			]}
			contacts={["Phone: (206) 123-4567"]}
			thingsToDo={[
				{
					title: "Pike Place Market",
					description: "Historic public market featuring fresh produce, crafts, and the famous fish throwers.",
					distance: "0.3 miles away",
					image: "/img/attractions/pike-place-market.jpg"
				},
				{
					title: "Space Needle",
					description: "Iconic observation tower offering panoramic views of Seattle and Mount Rainier.",
					distance: "0.8 miles away",
					image: "/img/attractions/space-needle.jpg"
				},
				{
					title: "Seattle Art Museum",
					description: "Major art museum showcasing contemporary and historical works.",
					distance: "0.2 miles away",
					image: "/img/attractions/seattle-art-museum.jpg"
				},
				{
					title: "Seattle Great Wheel",
					description: "Giant Ferris wheel on the waterfront with stunning views of Elliott Bay.",
					distance: "0.7 miles away",
					image: "/img/attractions/seattle-great-wheel.jpg"
				}
			]}/>
	)
}

export default Seattle