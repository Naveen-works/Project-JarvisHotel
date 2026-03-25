package com.example.backend.Services;

import com.example.backend.Exceptions.ResourceNotFoundException;
import com.example.backend.Models.Hotels;
import com.example.backend.Repositories.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotels> getHotels(String location) {
        if (location != null && !location.isBlank()) {
            return hotelRepository.findByLocationIgnoreCase(location.trim());
        }
        return hotelRepository.findAll();
    }

    public Hotels getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found: " + id));
    }
}
