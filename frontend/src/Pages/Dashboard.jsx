import React, { useEffect, useState } from 'react'
import { getBookings, cancelBooking } from '../Services/hotelService'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])

  function load() {
    setBookings(getBookings())
  }

  useEffect(() => { load() }, [])

  function handleCancel(id) {
    if (!confirm('Cancel this booking?')) return
    cancelBooking(id)
    load()
  }

  return (
    <div className="dashboard">
      <h2>Your Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div className="booking" key={b.id}>
          <div><strong>{b.hotelName}</strong> — {b.roomType}</div>
          <div>Price: ${b.price} • Status: {b.status}</div>
          <div style={{marginTop:8}}>
            {b.status === 'booked' && <button className="btn" onClick={() => handleCancel(b.id)}>Cancel</button>}
          </div>
        </div>
      ))}
    </div>
  )
}
