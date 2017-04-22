package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.domain.Pay;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Pay entity.
 */
@SuppressWarnings("unused")
public interface PayRepository extends JpaRepository<Pay,Long> {

}
