import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import HotelCard from '../Components/HotelCard'
import { searchHotels } from '../Services/hotelService'

export default function Home() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHotels({})
  }, [])

  async function fetchHotels(filters) {
    setLoading(true)
    const results = await searchHotels(filters)
    setHotels(results || [])
    setLoading(false)
  }

  function handleSearch(filters) {
    fetchHotels(filters)
  }

  return (
    <div>
      <h2>Find Hotels</h2>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p>Loading hotels...</p>
      ) : (
        <div className="grid">
          {hotels.length === 0 && <p>No hotels match your search.</p>}
          {hotels.map(h => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      )}
    </div>
  )
}
