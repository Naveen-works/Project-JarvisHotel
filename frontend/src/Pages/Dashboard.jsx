import React, { useEffect, useState } from 'react'
import { getBookings, cancelBooking } from '../Services/hotelService'
import { authService } from '../Services/authService'

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const user = authService.getCurrentUser()
    if (user && user.id) {
      const data = await getBookings(user.id)
      setBookings(data || [])
    }
    setLoading(false)
  }

  useEffect(() => { 
    load() 
  }, [])

  async function handleCancel(id) {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await cancelBooking(id)
      alert('Booking cancelled')
      load()
    } catch (e) {
      alert('Failed to cancel')
    }
  }

  if (loading) return <div>Loading bookings...</div>

  return (
    <div className="dashboard">
      <h2>Your Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map(b => (
        <div className="booking card" key={b.id} style={{marginBottom: '10px', padding: '15px'}}>
          <div><strong>{b.room?.hotel?.name || 'Hotel'}</strong> — {b.room?.type || 'Room'}</div>
          <div>Check In: {b.checkIn} | Check Out: {b.checkOut}</div>
          <div>Status: <span style={{fontWeight: 'bold', color: b.status === 'CANCELLED' ? 'red' : 'green'}}>{b.status}</span></div>
          <div style={{marginTop:8}}>
            {b.status === 'BOOKED' && <button className="btn" onClick={() => handleCancel(b.id)}>Cancel</button>}
          </div>
        </div>
      ))}
    </div>
  )
}
