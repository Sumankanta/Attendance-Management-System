package com.AttendanceServer.dto;

import com.AttendanceServer.enities.Project;
import com.AttendanceServer.enities.User;
import com.AttendanceServer.enums.AttendanceStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceDTO {

    private Long id;

    private LocalDate date;

    @Enumerated(value = EnumType.STRING)
    private AttendanceStatus attendanceStatus;

    private Long projectId;
    private String projectName;

    private Long employeeId;
    private String employeeName;

    private Long managerId;
    private String managerName;
}
