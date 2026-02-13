package com.AttendanceServer.enities;

import com.AttendanceServer.dto.UserDTO;
import com.AttendanceServer.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private UserRole userRole;

    public UserDTO getDto(){
        UserDTO userDTO = new UserDTO();

        userDTO.setId(id);
        userDTO.setName(name);
        userDTO.setUserRole(userRole);
        userDTO.setEmail(email);

        return userDTO;
    }
}
