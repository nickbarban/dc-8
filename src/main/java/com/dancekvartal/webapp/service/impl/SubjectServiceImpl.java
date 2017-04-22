package com.dancekvartal.webapp.service.impl;

import com.dancekvartal.webapp.service.SubjectService;
import com.dancekvartal.webapp.domain.Subject;
import com.dancekvartal.webapp.repository.SubjectRepository;
import com.dancekvartal.webapp.service.dto.SubjectDTO;
import com.dancekvartal.webapp.service.mapper.SubjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Subject.
 */
@Service
@Transactional
public class SubjectServiceImpl implements SubjectService{

    private final Logger log = LoggerFactory.getLogger(SubjectServiceImpl.class);
    
    private final SubjectRepository subjectRepository;

    private final SubjectMapper subjectMapper;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    /**
     * Save a subject.
     *
     * @param subjectDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubjectDTO save(SubjectDTO subjectDTO) {
        log.debug("Request to save Subject : {}", subjectDTO);
        Subject subject = subjectMapper.subjectDTOToSubject(subjectDTO);
        subject = subjectRepository.save(subject);
        SubjectDTO result = subjectMapper.subjectToSubjectDTO(subject);
        return result;
    }

    /**
     *  Get all the subjects.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Subjects");
        Page<Subject> result = subjectRepository.findAll(pageable);
        return result.map(subject -> subjectMapper.subjectToSubjectDTO(subject));
    }

    /**
     *  Get one subject by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SubjectDTO findOne(Long id) {
        log.debug("Request to get Subject : {}", id);
        Subject subject = subjectRepository.findOne(id);
        SubjectDTO subjectDTO = subjectMapper.subjectToSubjectDTO(subject);
        return subjectDTO;
    }

    /**
     *  Delete the  subject by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subject : {}", id);
        subjectRepository.delete(id);
    }
}
