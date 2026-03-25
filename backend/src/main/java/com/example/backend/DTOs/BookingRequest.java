package com.example.backend.DTOs;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {

    @NotNull(message = "roomId is required")
    private Long roomId;

    @NotNull(message = "checkInDate is required")
    @FutureOrPresent(message = "checkInDate must be today or in future")
    private LocalDate checkInDate;

    @NotNull(message = "checkOutDate is required")
    private LocalDate checkOutDate;

    @AssertTrue(message = "checkOutDate must be after checkInDate")
    public boolean isDateRangeValid() {
        if (checkInDate == null || checkOutDate == null) {
            return true;
        }
        return checkOutDate.isAfter(checkInDate);
    }
}
