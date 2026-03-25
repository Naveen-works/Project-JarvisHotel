import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getHotelById, bookRoom } from '../Services/hotelService'

export default function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)

  useEffect(() => {
    const h = getHotelById(id)
    setHotel(h)
  }, [id])

  function handleBook(room) {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) return alert('Please sign in first')
    const booking = {
      id: Date.now().toString(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType: room.type,
      price: room.price,
      user,
      status: 'booked'
    }
    bookRoom(booking)
    navigate('/dashboard')
  }

  if (!hotel) return <div>Loading...</div>

  return (
    <div>
      <h2>{hotel.name}</h2>
      <div className="amenities">{hotel.city} • {hotel.stars}★</div>
      <p>{hotel.description}</p>

      <div className="room-list">
        {hotel.rooms.map(r => (
          <div className="room card" key={r.id}>
            <div>
              <strong>{r.type}</strong>
              <div className="amenities">{r.beds} beds • {r.amenities.join(', ')}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{marginBottom:8}}>${r.price}</div>
              <button className="btn" onClick={() => handleBook(r)}>BOOK</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
