import React, { useState } from 'react'

export default function LoginModal({ onClose }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    localStorage.setItem('user', JSON.stringify({ name: name.trim() }))
    onClose && onClose()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:8}}>
            <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
            <button type="button" onClick={onClose}>Close</button>
            <button className="btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
