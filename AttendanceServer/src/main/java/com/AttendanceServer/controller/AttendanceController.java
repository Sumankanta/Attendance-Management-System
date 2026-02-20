package com.AttendanceServer.controller;

import com.AttendanceServer.dto.AttendanceDTO;
import com.AttendanceServer.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/add")
    public ResponseEntity<?> MarkAttendance(@RequestBody AttendanceDTO attendanceDTO){
        try{
            return ResponseEntity.ok(attendanceService.markAttendance(attendanceDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
