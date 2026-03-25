package com.example.backend.Services;

import com.example.backend.DTOs.BookingRequest;
import com.example.backend.DTOs.BookingResponse;
import com.example.backend.Exceptions.BadRequestException;
import com.example.backend.Exceptions.ResourceNotFoundException;
import com.example.backend.Exceptions.UnauthorizedException;
import com.example.backend.Models.AppUser;
import com.example.backend.Models.Booking;
import com.example.backend.Models.Room;
import com.example.backend.Repositories.BookingRepository;
import com.example.backend.Repositories.RoomRepository;
import com.example.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final EmailNotificationService emailNotificationService;

    public BookingService(UserRepository userRepository, RoomRepository roomRepository, BookingRepository bookingRepository, EmailNotificationService emailNotificationService) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.emailNotificationService = emailNotificationService;
    }

    @Transactional
    public BookingResponse createBooking(String userEmail, BookingRequest request) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Room room = roomRepository.findByIdForUpdate(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + request.getRoomId()));

        if (room.getAvailableCount() <= 0) {
            throw new BadRequestException("Room is fully booked");
        }

        room.setAvailableCount(room.getAvailableCount() - 1);
        roomRepository.save(room);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());

        Booking savedBooking = bookingRepository.save(booking);
        emailNotificationService.sendBookingConfirmation(savedBooking);

        return mapToResponse(savedBooking);
    }

    public List<BookingResponse> getUserBookings(String userEmail) {
        return bookingRepository.findByUserEmail(userEmail).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void cancelBooking(String userEmail, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        if (!booking.getUser().getEmail().equalsIgnoreCase(userEmail)) {
            throw new UnauthorizedException("You are not allowed to cancel this booking");
        }

        Room room = roomRepository.findByIdForUpdate(booking.getRoom().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        room.setAvailableCount(room.getAvailableCount() + 1);
        roomRepository.save(room);

        bookingRepository.delete(booking);
        emailNotificationService.sendBookingCancellation(booking);
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .roomId(booking.getRoom().getId())
                .hotelId(booking.getRoom().getHotel().getId())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .build();
    }
}
