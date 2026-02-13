package com.AttendanceServer.controller;

import com.AttendanceServer.dto.UserDTO;
import com.AttendanceServer.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        UserDTO dbUser = authService.login(userDTO);

        if(dbUser == null){
            return new ResponseEntity<>("Wrong Credentials", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(dbUser, HttpStatus.OK);
    }
}
