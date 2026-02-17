package com.AttendanceServer.service;

import com.AttendanceServer.dto.UserDTO;
import com.AttendanceServer.enities.Project;
import com.AttendanceServer.enities.User;
import com.AttendanceServer.enums.UserRole;
import com.AttendanceServer.repository.ProjectRepository;
import com.AttendanceServer.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public UserDTO createUser(UserDTO userDTO){

        // Check if email exists
        if(userRepository.findByEmail(userDTO.getEmail()).isPresent()){
            throw new EntityExistsException("User already exists");
        }

        // Fetch project
        Project project = projectRepository
                .findById(userDTO.getProjectId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Project Not Found")
                );

        // Create user
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword()); // encode in real apps
        user.setUserRole(userDTO.getUserRole());
        user.setProject(project);

        User savedUser = userRepository.save(user);

        return savedUser.getDto();
    }

    public List<UserDTO> getAllManager(){
        List<User> users = userRepository.findAllByUserRole(UserRole.MANAGER);
        return users.stream().map(User::getDto).collect(Collectors.toList());
    }
}
