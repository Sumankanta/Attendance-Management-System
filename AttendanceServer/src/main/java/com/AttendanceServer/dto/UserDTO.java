package com.AttendanceServer.dto;

import com.AttendanceServer.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String email;

    private String password;

    private String name;

    private UserRole userRole;
}
