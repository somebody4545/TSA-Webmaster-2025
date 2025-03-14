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
			contacts={["Phone: (312) 123-4567"]}/>
	)
}

export default Chicago