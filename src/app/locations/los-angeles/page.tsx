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
			contacts={["Phone: (213) 123-4567"]}/>
	)
}

export default LosAngeles