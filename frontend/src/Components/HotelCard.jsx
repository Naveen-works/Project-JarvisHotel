import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ hotel }) {
  const roomTypes = hotel.rooms.map(r => r.type).join(', ')
  const price = Math.min(...hotel.rooms.map(r => r.price)) + ' - ' + Math.max(...hotel.rooms.map(r => r.price))
  return (
    <article className="card">
      <h3>{hotel.name}</h3>
      <div className="amenities">{hotel.city} • {hotel.stars}★</div>
      <p className="amenities">Rooms: {roomTypes}</p>
      <p className="amenities">Price: {price}</p>
      <p className="amenities">Amenities: {hotel.amenities.join(', ')}</p>
      <div style={{marginTop:8}}>
        <Link to={`/hotel/${hotel.id}`} className="btn">View details</Link>
      </div>
    </article>
  )
}
