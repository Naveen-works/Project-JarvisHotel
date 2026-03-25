package com.example.backend.Services;

import com.example.backend.Models.Booking;

public interface EmailNotificationService {
    void sendBookingConfirmation(Booking booking);

    void sendBookingCancellation(Booking booking);
}
