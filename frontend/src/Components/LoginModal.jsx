import React, { useState } from 'react'
import { authService } from '../Services/authService'

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function reset() {
    setName('')
    setEmail('')
    setPassword('')
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password) {
        setError('All fields are required')
        setLoading(false)
        return
      }
      
      const res = await authService.register(name.trim(), email.trim().toLowerCase(), password)
      if (res.success) {
        // Automatically login after successful registration or ask them to login
        const loginRes = await authService.login(email.trim().toLowerCase(), password)
        if (loginRes.success) {
          onLoginSuccess && onLoginSuccess()
          onClose && onClose()
          reset()
        } else {
          setMode('signin')
          setError('Registration successful, please sign in')
        }
      } else {
        setError(res.error)
      }
      setLoading(false)
      return
    }

    // signin
    if (!email.trim() || !password) {
      setError('Email and password required')
      setLoading(false)
      return
    }

    const res = await authService.login(email.trim().toLowerCase(), password)
    if (res.success) {
      onLoginSuccess && onLoginSuccess()
      onClose && onClose()
      reset()
    } else {
      setError(res.error)
    }
    setLoading(false)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{mode === 'signin' ? 'Sign in' : 'Sign up'}</h3>
        {error && <div style={{color:'red', marginBottom:8}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{marginBottom:8}}>
              <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} disabled={loading} />
            </div>
          )}
          <div style={{marginBottom:8}}>
            <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </div>
          <div style={{marginBottom:8}}>
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </div>

          <div style={{display:'flex', gap:8, justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontSize:13}}>
              {mode === 'signin' ? (
                <span>New here? <button type="button" onClick={() => { setMode('signup'); setError('') }} disabled={loading}>Create account</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => { setMode('signin'); setError('') }} disabled={loading}>Sign in</button></span>
              )}
            </div>
            <div style={{display:'flex', gap:8}}>
              <button type="button" onClick={() => { onClose && onClose(); reset() }} disabled={loading}>Close</button>
              <button className="btn" type="submit" disabled={loading}>{loading ? 'Processing...' : (mode === 'signin' ? 'Sign in' : 'Sign up')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
