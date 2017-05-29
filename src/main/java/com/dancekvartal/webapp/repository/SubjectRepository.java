package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for the Subject entity.
 */
@SuppressWarnings("unused")
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findByTeacherId(Long teacherId);
}
