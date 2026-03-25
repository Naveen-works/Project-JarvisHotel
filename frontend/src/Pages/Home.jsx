import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import HotelCard from '../Components/HotelCard'
import { searchHotels } from '../Services/hotelService'

export default function Home() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    // initial load: all hotels
    const results = searchHotels({})
    setHotels(results)
  }, [])

  function handleSearch(filters) {
    const results = searchHotels(filters)
    setHotels(results)
  }

  return (
    <div>
      <h2>Find Hotels</h2>
      <SearchBar onSearch={handleSearch} />

      <div className="grid">
        {hotels.length === 0 && <p>No hotels match your search.</p>}
        {hotels.map(h => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </div>
    </div>
  )
}
