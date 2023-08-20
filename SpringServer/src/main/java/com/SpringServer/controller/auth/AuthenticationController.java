package com.SpringServer.controller.auth;

import com.SpringServer.model.dto.auth.AuthenticationRequest;
import com.SpringServer.model.dto.auth.AuthLoginResponse;
import com.SpringServer.service.auth.AuthenticationService;
import com.SpringServer.model.dto.auth.AuthRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthLoginResponse> register(@RequestBody AuthRegisterRequest request){
        return  ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthLoginResponse> login(@RequestBody AuthenticationRequest request){
        return  ResponseEntity.ok(service.authenticate(request));
    }
// 추가할 일 db에 refresh 토큰 저장, 관리 -------------------------------------------------------------------------------------------------------
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
//        // 유효한 갱신 토큰인지 확인 및 사용자 정보 로드
//        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtService.extractUserId(refreshTokenRequest.getRefreshToken()));
//        // 새로운 액세스 토큰 생성
//        String newAccessToken = jwtService.generateToken(userDetails);
//        return ResponseEntity.ok(new AuthenticationResponse(newAccessToken, refreshTokenRequest.getRefreshToken()));
//    }
// -------------------------------------------------------------------------------------------------------

    @GetMapping("/logout")
    public ResponseEntity<?> logout(){

        return ResponseEntity.ok("logout");
    }
}
