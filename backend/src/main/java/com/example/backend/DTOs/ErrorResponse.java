package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private int status;
    private Instant timestamp;
}
