"use client"

import React from 'react'
import CityCard from '@/components/CityCard'

const Locations = () => {
    return (
        <>
            <div className="grid grid-cols-4 min-h-[90vh]">
                <div className="col-span-1 grid grid-rows-4 bg-primary-darker">
                    <CityCard city="New York" image="/img/cities/New York.jpeg" />
                    <CityCard city="Los Angeles" image="/img/cities/Los Angeles.jpeg" />
                    <CityCard city="Chicago" image="/img/cities/Chicago.jpg" />
                    <CityCard city="Seattle" image="/img/cities/Seattle.jpg" />
                </div>
                <div className="col-span-3 bg-background p-4">
                </div>
            </div>
        </>
    )
}

export default Locations