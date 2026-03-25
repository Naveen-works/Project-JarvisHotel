package com.example.backend.Services;

import com.example.backend.DTOs.AuthResponse;
import com.example.backend.DTOs.LoginRequest;
import com.example.backend.DTOs.RegisterRequest;
import com.example.backend.Exceptions.ConflictException;
import com.example.backend.Exceptions.UnauthorizedException;
import com.example.backend.Models.AppUser;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.Utils.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public String register(RegisterRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(existing -> {
            throw new ConflictException("Email already registered");
        });

        AppUser user = new AppUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {
        AppUser user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse("Login successful", token);
    }
}
