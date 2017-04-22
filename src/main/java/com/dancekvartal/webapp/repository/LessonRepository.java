package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Lesson;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Lesson entity.
 */
@SuppressWarnings("unused")
public interface LessonRepository extends JpaRepository<Lesson,Long> {

}
