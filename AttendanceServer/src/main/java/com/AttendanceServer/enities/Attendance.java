package com.AttendanceServer.enities;

import com.AttendanceServer.dto.AttendanceDTO;
import com.AttendanceServer.enums.AttendanceStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Enumerated(value = EnumType.STRING)
    private AttendanceStatus attendanceStatus;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User employee;

    @ManyToOne
    private User manager;

    public AttendanceDTO getDto(){
        AttendanceDTO attendanceDTO = new AttendanceDTO();

        attendanceDTO.setId(id);
        attendanceDTO.setDate(date);
        attendanceDTO.setAttendanceStatus(attendanceStatus);

        attendanceDTO.setProjectId(project.getId());
        attendanceDTO.setProjectName(project.getName());

        attendanceDTO.setEmployeeId(employee.getId());
        attendanceDTO.setEmployeeName(employee.getName());

        attendanceDTO.setManagerId(manager.getId());
        attendanceDTO.setManagerName(manager.getName());

        return attendanceDTO;
    }
}
