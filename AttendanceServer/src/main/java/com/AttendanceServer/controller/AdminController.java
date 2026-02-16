package com.AttendanceServer.controller;

import com.AttendanceServer.dto.UserDTO;
import com.AttendanceServer.service.AdminService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/create-user")
    public ResponseEntity<?> signupUser(@RequestBody UserDTO userDTO){
        try{
            return ResponseEntity.ok(
                    adminService.createUser(userDTO)
            );

        }catch (EntityExistsException e){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        }catch (EntityNotFoundException e){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());

        }catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User not created, try again later");
        }
    }

    @GetMapping("/managers")
    public ResponseEntity<?> getAllManagers(){
        try{
            return ResponseEntity.ok(adminService.getAllManager());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

