package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Parent;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Parent entity.
 */
@SuppressWarnings("unused")
public interface ParentRepository extends JpaRepository<Parent,Long> {

}
