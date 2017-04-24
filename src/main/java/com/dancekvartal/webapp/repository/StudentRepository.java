package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Student;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
public interface StudentRepository extends JpaRepository<Student,Long> {

    @Query("select distinct student from Student student left join fetch student.subjects")
    List<Student> findAllWithEagerRelationships();

    @Query("select student from Student student left join fetch student.subjects where student.id =:id")
    Student findOneWithEagerRelationships(@Param("id") Long id);

}
