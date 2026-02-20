package com.AttendanceServer.controller;

import com.AttendanceServer.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/managers")
@CrossOrigin(origins = "*")
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping("/employees/{projectId}")
    public ResponseEntity<?> getAllEmployeesByProject(@PathVariable Long projectId){
        try{
            return ResponseEntity.ok(managerService.getAllEmployeesByProject(projectId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
