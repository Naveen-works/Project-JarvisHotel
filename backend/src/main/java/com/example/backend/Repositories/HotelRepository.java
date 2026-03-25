package com.example.backend.Repositories;

import com.example.backend.Models.Hotels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotels, Long> {
    List<Hotels> findByLocationIgnoreCase(String location);
}
