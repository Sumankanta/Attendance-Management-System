package com.AttendanceServer.service;

import com.AttendanceServer.dto.AttendanceDTO;
import com.AttendanceServer.dto.LeaveRequestDTO;
import com.AttendanceServer.enities.Attendance;
import com.AttendanceServer.enities.LeaveRequest;
import com.AttendanceServer.enities.Project;
import com.AttendanceServer.enities.User;
import com.AttendanceServer.enums.UserRole;
import com.AttendanceServer.repository.AttendanceRepository;
import com.AttendanceServer.repository.LeaveRequestRepository;
import com.AttendanceServer.repository.ProjectRepository;
import com.AttendanceServer.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
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
    private final LeaveRequestRepository leaveRequestRepository;

    public AttendanceDTO markAttendance(AttendanceDTO attendanceDTO) {
        Optional<Attendance> optionalAttendance = attendanceRepository.findByEmployeeIdAndProjectIdAndDate(attendanceDTO.getEmployeeId(), attendanceDTO.getProjectId(), LocalDate.now());

        if (optionalAttendance.isEmpty()) {
            Optional<User> optionalEmployee = userRepository.findById(attendanceDTO.getEmployeeId());
            Optional<User> optionalManager = userRepository.findById(attendanceDTO.getManagerId());
            Optional<Project> optionalProject = projectRepository.findById(attendanceDTO.getProjectId());

            if (optionalEmployee.isPresent() && optionalManager.isPresent() && optionalProject.isPresent()) {
                Attendance attendance = new Attendance();

                attendance.setDate(LocalDate.now());
                attendance.setAttendanceStatus(attendanceDTO.getAttendanceStatus());
                attendance.setEmployee(optionalEmployee.get());
                attendance.setProject(optionalProject.get());
                attendance.setManager(optionalManager.get());

                return attendanceRepository.save(attendance).getDto();
            } else {
                throw new EntityNotFoundException("Some Related Entity Not Found");
            }
        } else {
            throw new EntityExistsException("Attendance Already Marked For Today");
        }
    }

    public LeaveRequestDTO applyLeave(LeaveRequestDTO leaveRequestDTO) {
        Optional<LeaveRequest> optionalLeaveRequest = leaveRequestRepository.findByEmployeeIdAndProjectIdAndDate(
                leaveRequestDTO.getEmployeeId(), leaveRequestDTO.getProjectId(), LocalDate.now()
        );

        if (optionalLeaveRequest.isEmpty()) {
            Optional<User> optionalEmployee = userRepository.findById(leaveRequestDTO.getEmployeeId());
            Optional<User> optionalManager = userRepository.findByProjectIdAndUserRole(leaveRequestDTO.getProjectId(), UserRole.MANAGER);
            Optional<Project> optionalProject = projectRepository.findById(leaveRequestDTO.getProjectId());

            if (optionalEmployee.isPresent() && optionalManager.isPresent() && optionalProject.isPresent()) {
                LeaveRequest leaveRequest = new LeaveRequest();

                leaveRequest.setDate(LocalDate.now());
                leaveRequest.setEmployee(optionalEmployee.get());
                leaveRequest.setManager(optionalManager.get());
                leaveRequest.setProject(optionalProject.get());

                return leaveRequestRepository.save(leaveRequest).getDto();
            } else {
                throw new EntityNotFoundException("Some Related Entity Not Found");
            }
        } else {
            throw new EntityExistsException("Leave Request Already Applied For Today");
        }
    }
}
