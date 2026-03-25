import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))

  function handleClose() {
    setShowLogin(false)
    setUser(JSON.parse(localStorage.getItem('user') || 'null'))
  }

  function logout() {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <header className="navbar">
      <div className="brand"><Link to="/">Jarvis Hotel</Link></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user ? (
          <>
            <span style={{marginLeft:8}}>Hi, {user.name}</span>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
        )}
      </div>

      {showLogin && <LoginModal onClose={handleClose} />}
    </header>
  )
}
