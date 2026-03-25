import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [availability, setAvailability] = useState('any')
  const [parking, setParking] = useState(false)

  function submit(e) {
    e && e.preventDefault()
    onSearch({ location, startDate, endDate, availability, parking })
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <select value={availability} onChange={e => setAvailability(e.target.value)}>
        <option value="any">Any</option>
        <option value="yes">Available</option>
        <option value="no">Not available</option>
      </select>
      <label style={{display:'flex',alignItems:'center',gap:6}}>
        <input type="checkbox" checked={parking} onChange={e => setParking(e.target.checked)} /> Parking
      </label>
      <button className="btn" type="submit">Search</button>
    </form>
  )
}
