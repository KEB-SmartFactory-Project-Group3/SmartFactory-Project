package com.SpringServer.service;

import com.SpringServer.model.dto.AuthenticationRequest;
import com.SpringServer.model.dto.AuthLoginResponse;
import com.SpringServer.model.dto.RegisterRequest;
import com.SpringServer.model.entity.User;
import com.SpringServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthLoginResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getId(),
                        request.getPassword()
                )
        );
        var user = userRepository.findById(request.getId())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthLoginResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .build();
    }

    public AuthLoginResponse register(RegisterRequest request) {
        var user = User.builder()
                .id(request.getId())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthLoginResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .build();
    }
}
