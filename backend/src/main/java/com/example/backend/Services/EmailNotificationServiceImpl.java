package com.example.backend.Services;

import com.example.backend.Models.Booking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailNotificationServiceImpl implements EmailNotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    public EmailNotificationServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    @Override
    public void sendBookingConfirmation(Booking booking) {
        sendEmail(
                booking.getUser().getEmail(),
                "Booking Confirmed",
                "Your booking #" + booking.getId() + " is confirmed for room #" + booking.getRoom().getId() + "."
        );
    }

    @Async
    @Override
    public void sendBookingCancellation(Booking booking) {
        sendEmail(
                booking.getUser().getEmail(),
                "Booking Cancelled",
                "Your booking #" + booking.getId() + " has been cancelled."
        );
    }

    private void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception ex) {
            log.warn("Email sending failed: {}", ex.getMessage());
        }
    }
}
