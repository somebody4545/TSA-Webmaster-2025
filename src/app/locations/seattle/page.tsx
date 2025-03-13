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
			contacts={["Phone: (206) 123-4567"]}/>
	)
}

export default Seattle