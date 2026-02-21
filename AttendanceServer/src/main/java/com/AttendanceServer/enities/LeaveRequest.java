package com.AttendanceServer.enities;

import com.AttendanceServer.dto.LeaveRequestDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private Boolean status;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User employee;

    @ManyToOne
    private User manager;

    public LeaveRequestDTO getDto() {
        LeaveRequestDTO leaveRequestDTO = new LeaveRequestDTO();

        leaveRequestDTO.setId(id);
        leaveRequestDTO.setDate(LocalDate.now());

        leaveRequestDTO.setProjectId(project.getId());
        leaveRequestDTO.setProjectName(project.getName());

        leaveRequestDTO.setEmployeeId(employee.getId());
        leaveRequestDTO.setEmployeeName(employee.getName());

        leaveRequestDTO.setManagerId(manager.getId());
        leaveRequestDTO.setManagerName(manager.getName());

        return leaveRequestDTO;
    }
}
