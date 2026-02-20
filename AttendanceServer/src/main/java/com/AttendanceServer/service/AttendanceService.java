package com.AttendanceServer.service;

import com.AttendanceServer.dto.AttendanceDTO;
import com.AttendanceServer.enities.Attendance;
import com.AttendanceServer.enities.Project;
import com.AttendanceServer.enities.User;
import com.AttendanceServer.repository.AttendanceRepository;
import com.AttendanceServer.repository.ProjectRepository;
import com.AttendanceServer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public AttendanceDTO markAttendance(AttendanceDTO attendanceDTO){
        Optional<User> optionalEmployee = userRepository.findById(attendanceDTO.getEmployeeId());
        Optional<User> optionalManager = userRepository.findById(attendanceDTO.getManagerId());
        Optional<Project> optionalProject = projectRepository.findById(attendanceDTO.getProjectId());

        if(optionalEmployee.isPresent() && optionalManager.isPresent() && optionalProject.isPresent()){
            Attendance attendance = new Attendance();

            attendance.setDate(LocalDate.now());
            attendance.setAttendanceStatus(attendanceDTO.getAttendanceStatus());
            attendance.setEmployee(optionalEmployee.get());
            attendance.setProject(optionalProject.get());
            attendance.setManager(optionalManager.get());

            return attendanceRepository.save(attendance).getDto();
        }else {
            throw new EntityNotFoundException("Some Related Entity Not Found");
        }
    }
}
