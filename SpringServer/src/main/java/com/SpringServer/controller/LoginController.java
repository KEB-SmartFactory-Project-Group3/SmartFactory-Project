package com.SpringServer.controller;

import com.SpringServer.model.entity.User;
import com.SpringServer.model.dto.LoginDTO;
import com.SpringServer.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User request) {
        System.out.println("Request body: id=" + request.getId() + ", password=" + request.getPassword());
        User user = userService.findById(request.getId());
        if (user != null && userService.checkPassword(user, request.getPassword())) {
            return ResponseEntity.ok().body(new LoginDTO(user));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}

