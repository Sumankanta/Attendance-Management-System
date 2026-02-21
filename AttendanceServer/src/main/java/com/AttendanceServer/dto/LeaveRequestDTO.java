package com.AttendanceServer.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveRequestDTO {

    private Long id;

    private LocalDate date;

    private Boolean status;

    private Long projectId;
    private String projectName;

    private Long employeeId;
    private String employeeName;

    private Long managerId;
    private String managerName;
}
