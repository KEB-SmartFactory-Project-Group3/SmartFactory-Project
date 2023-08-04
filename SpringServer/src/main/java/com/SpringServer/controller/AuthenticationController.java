package com.SpringServer.controller;

import com.SpringServer.model.dto.AuthenticationRequest;
import com.SpringServer.model.dto.AuthenticationResponse;
import com.SpringServer.service.AuthenticationService;
import com.SpringServer.model.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return  ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response){
        AuthenticationResponse authResponse = service.authenticate(request);
        response.addHeader("Authorization", authResponse.getToken());
        String responseBody = authResponse.getName();
        return  ResponseEntity.ok(responseBody);
    }
}
