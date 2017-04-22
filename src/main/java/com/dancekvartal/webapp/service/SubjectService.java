package com.dancekvartal.webapp.service;

import com.dancekvartal.webapp.service.dto.SubjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Subject.
 */
public interface SubjectService {

    /**
     * Save a subject.
     *
     * @param subjectDTO the entity to save
     * @return the persisted entity
     */
    SubjectDTO save(SubjectDTO subjectDTO);

    /**
     *  Get all the subjects.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<SubjectDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" subject.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SubjectDTO findOne(Long id);

    /**
     *  Delete the "id" subject.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
