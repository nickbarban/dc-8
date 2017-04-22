package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Teacher;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Teacher entity.
 */
@SuppressWarnings("unused")
public interface TeacherRepository extends JpaRepository<Teacher,Long> {

}
