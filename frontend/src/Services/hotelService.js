import api from './api';

export async function searchHotels(filters) {
  try {
    const params = {};
    if (filters?.location) {
      params.location = filters.location;
    }
    const response = await api.get('/hotels', { params });
    let hotels = response.data;
    
    if (filters?.parking) {
      hotels = hotels.filter(h => h.amenities && h.amenities.includes('parking'));
    }
    if (filters?.availability === 'yes') {
      hotels = hotels.filter(h => h.rooms && h.rooms.some(r => r.available));
    }
    if (filters?.availability === 'no') {
      hotels = hotels.filter(h => h.rooms && h.rooms.every(r => !r.available));
    }
    return hotels;
  } catch (error) {
    console.error("Error searching hotels:", error);
    return [];
  }
}

export async function getHotelById(id) {
  try {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting hotel by id:", error);
    return null;
  }
}

/**
 * Books a room using the backend API
 * @param {Object} data - { roomId, checkInDate, checkOutDate } (aligns with typical BookingRequest)
 */
export async function bookRoom(data) {
  try {
    const response = await api.post('/bookings', {
      roomId: data.roomId,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate
    });
    return response.data;
  } catch (error) {
    console.error("Error booking room:", error);
    throw error;
  }
}

export async function getBookings() {
  try {
    const response = await api.get(`/bookings/user`);
    return response.data;
  } catch (error) {
    console.error("Error getting bookings:", error);
    return [];
  }
}

export async function cancelBooking(id) {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
}
