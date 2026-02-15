package com.AttendanceServer.service;

import com.AttendanceServer.dto.ProjectDTO;
import com.AttendanceServer.enities.Project;
import com.AttendanceServer.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectDTO addProject(ProjectDTO projectDTO){
        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setDuration(projectDTO.getDuration());
        project.setStartDate(projectDTO.getStartDate());

        return projectRepository.save(project).getDto();
    }

    public List<ProjectDTO> getAllProjects(){
        return projectRepository.findAll().stream().map(Project::getDto).collect(Collectors.toList());
    }
}
