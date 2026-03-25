export function loginUser(name) {
  if (!name.trim()) return null
  const user = { id: Date.now().toString(), name: name.trim() }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export function logoutUser() {
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
