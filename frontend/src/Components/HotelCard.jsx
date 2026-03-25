import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCard({ hotel }) {
  const roomTypes = hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms.map(r => r.type).join(', ') : 'No rooms';
  const prices = hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms.map(r => r.price) : [0];
  const priceRange = prices.length > 1 ? `${Math.min(...prices)} - ${Math.max(...prices)}` : prices[0];
  const amenitiesList = hotel.amenities ? hotel.amenities.join(', ') : '';

  return (
    <article className="card">
      <h3>{hotel.name}</h3>
      <div className="amenities">{hotel.location || hotel.city} • {hotel.stars ? `${hotel.stars}★` : ''}</div>
      <p className="amenities">Rooms: {roomTypes}</p>
      <p className="amenities">Price: ${priceRange}</p>
      {amenitiesList && <p className="amenities">Amenities: {amenitiesList}</p>}
      <div style={{marginTop:8}}>
        <Link to={`/hotel/${hotel.id}`} className="btn">View details</Link>
      </div>
    </article>
  )
}
