package com.SpringServer.service.auth;

import com.SpringServer.model.dto.auth.AuthenticationRequest;
import com.SpringServer.model.dto.auth.AuthLoginResponse;
import com.SpringServer.model.dto.auth.AuthRegisterRequest;
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
        // refresh token 발급--------------------------------------------
//        var refreshToken = jwtService.generateRefreshToken(user);
        // refresh token AuthLoginResponse에 추가?----------------------------
        return AuthLoginResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .build();
    }

    public AuthLoginResponse register(AuthRegisterRequest request) {
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

// ---------------------- refreshToken 발급 -----------------------------------------------------
//    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getId(),
//                        request.getPassword()
//                )
//        );
//        var user = userRepository.findById(request.getId())
//                .orElseThrow();
//        var jwtToken = jwtService.generateToken(user);
//        return RefreshTokenResponse.builder()
//                .token(jwtToken)
//                .refreshToken(refreshToken)
//                .build();
//    }
// ----------------------------------------------------------------------------------------------
}
