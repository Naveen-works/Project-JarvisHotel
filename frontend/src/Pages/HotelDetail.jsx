import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getHotelById, bookRoom } from '../Services/hotelService'
import { authService } from '../Services/authService'

export default function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  useEffect(() => {
    async function fetchHotel() {
      const h = await getHotelById(id)
      setHotel(h)
      setLoading(false)
    }
    fetchHotel()
  }, [id])

  async function handleBook(room) {
    if (!authService.isAuthenticated()) return alert('Please sign in first')
    if (!checkIn || !checkOut) return alert('Please select check-in and check-out dates.')

    try {
      await bookRoom({
        roomId: room.id,
        checkInDate: checkIn,
        checkOutDate: checkOut
      })
      alert('Room booked successfully!')
      navigate('/dashboard')
    } catch (error) {
      alert('Failed to book room: ' + error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!hotel) return <div>Hotel not found</div>

  return (
    <div>
      <h2>{hotel.name}</h2>
      <div className="amenities">{hotel.location || hotel.city}</div>
      <p>{hotel.description}</p>
      
      {hotel.imageUrl && <img src={hotel.imageUrl} alt={hotel.name} style={{maxWidth: '100%', height: 'auto', marginBottom: '20px'}} />}

      <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Select Dates</h3>
        <label style={{marginRight: '10px'}}>
          Check In: <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        </label>
        <label>
          Check Out: <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
        </label>
      </div>

      <div className="room-list">
        {!hotel.rooms || hotel.rooms.length === 0 ? <p>No rooms available.</p> : null}
        {hotel.rooms?.map(r => (
          <div className="room card" key={r.id}>
            <div>
              <strong>{r.type} Room</strong>
              <div className="amenities">{r.available ? 'Available' : 'Not Available'}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{marginBottom:8}}>${r.price}</div>
              <button 
                className="btn" 
                onClick={() => handleBook(r)}
                disabled={!r.available}
              >
                {r.available ? 'BOOK' : 'UNAVAILABLE'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
