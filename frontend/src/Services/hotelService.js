const HOTELS = [
  {
    id: 'h1',
    name: 'Sunrise Inn',
    city: 'New York',
    stars: 3,
    description: 'A comfortable budget hotel near city center.',
    amenities: ['wifi', 'breakfast', 'parking'],
    rooms: [
      { id: 'r1', type: 'Single', beds: 1, price: 50, amenities: ['wifi'], available: true },
      { id: 'r2', type: 'Double', beds: 2, price: 80, amenities: ['wifi','breakfast'], available: true }
    ]
  },
  {
    id: 'h2',
    name: 'Lakeview Resort',
    city: 'Chicago',
    stars: 4,
    description: 'Calm resort with lake view and parking.',
    amenities: ['wifi','pool','parking'],
    rooms: [
      { id: 'r3', type: 'Standard', beds: 2, price: 120, amenities: ['wifi','pool'], available: true },
      { id: 'r4', type: 'Suite', beds: 3, price: 200, amenities: ['wifi','pool','breakfast'], available: false }
    ]
  },
  {
    id: 'h3',
    name: 'City Lights Hotel',
    city: 'San Francisco',
    stars: 4,
    description: 'Modern hotel in downtown.',
    amenities: ['wifi','gym'],
    rooms: [
      { id: 'r5', type: 'Queen', beds: 1, price: 140, amenities: ['wifi','gym'], available: true }
    ]
  }
]

export function searchHotels(filters) {
  const { location, parking } = filters || {}
  return HOTELS.filter(h => {
    if (location && !h.city.toLowerCase().includes(location.toLowerCase())) return false
    if (parking && !h.amenities.includes('parking')) return false
    return true
  })
}

export function getHotelById(id) {
  return HOTELS.find(h => h.id === id)
}
