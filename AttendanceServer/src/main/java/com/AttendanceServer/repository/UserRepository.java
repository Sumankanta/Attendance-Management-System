package com.AttendanceServer.repository;

import com.AttendanceServer.enities.User;
import com.AttendanceServer.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserRole(UserRole userRole);
}