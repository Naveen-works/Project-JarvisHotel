package com.example.backend.Controllers;

import com.example.backend.DTOs.BookingRequest;
import com.example.backend.DTOs.BookingResponse;
import com.example.backend.Services.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
	public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request,
														 Authentication authentication) {
		return ResponseEntity.ok(bookingService.createBooking(authentication.getName(), request));
	}

	@GetMapping("/user")
	public ResponseEntity<List<BookingResponse>> getUserBookings(Authentication authentication) {
		return ResponseEntity.ok(bookingService.getUserBookings(authentication.getName()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> cancelBooking(@PathVariable Long id, Authentication authentication) {
		bookingService.cancelBooking(authentication.getName(), id);
		return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
	}



}
