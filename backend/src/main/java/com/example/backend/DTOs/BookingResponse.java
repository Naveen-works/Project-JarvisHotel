package com.example.backend.DTOs;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;

@Value
@Builder
public class BookingResponse {
    Long id;
    Long roomId;
    Long hotelId;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
