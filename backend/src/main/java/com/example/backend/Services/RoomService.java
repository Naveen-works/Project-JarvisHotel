package com.example.backend.Services;

import com.example.backend.Exceptions.ResourceNotFoundException;
import com.example.backend.Models.Room;
import com.example.backend.Repositories.HotelRepository;
import com.example.backend.Repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    public RoomService(RoomRepository roomRepository, HotelRepository hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }

    public List<Room> getRoomsByHotel(Long hotelId) {
        if (!hotelRepository.existsById(hotelId)) {
            throw new ResourceNotFoundException("Hotel not found: " + hotelId);
        }
        return roomRepository.findByHotelId(hotelId);
    }
}
