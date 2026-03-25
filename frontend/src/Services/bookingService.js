function loadBookings() {
  return JSON.parse(localStorage.getItem('bookings') || '[]')
}

function saveBookings(bookings) {
  localStorage.setItem('bookings', JSON.stringify(bookings))
}

export function bookRoom(booking) {
  const bookings = loadBookings()
  bookings.push(booking)
  saveBookings(bookings)
}

export function getBookings() {
  return loadBookings()
}

export function cancelBooking(id) {
  const bookings = loadBookings().map(b =>
    b.id === id ? { ...b, status: 'cancelled' } : b
  )
  saveBookings(bookings)
}
