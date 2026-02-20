package com.AttendanceServer.repository;

import com.AttendanceServer.enities.User;
import com.AttendanceServer.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserRole(UserRole userRole);

    Optional<User> findByEmail(String email);

    List<User> findAllByUserRole(UserRole userRole);

    List<User> findAllByProjectIdAndUserRole(Long projectId, UserRole userRole);
}