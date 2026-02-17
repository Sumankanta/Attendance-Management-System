package com.AttendanceServer.enities;

import com.AttendanceServer.dto.UserDTO;
import com.AttendanceServer.enums.UserRole;
import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @ManyToOne
    private Project project;

    public UserDTO getDto(){
        UserDTO userDTO = new UserDTO();

        userDTO.setId(id);
        userDTO.setName(name);
        userDTO.setUserRole(userRole);
        userDTO.setEmail(email);

        if(project != null){
            userDTO.setProjectId(project.getId());
            userDTO.setProjectName(project.getName());
        }

        return userDTO;
    }
}
