package com.dancekvartal.webapp.service.impl;

import com.dancekvartal.webapp.domain.Teacher;
import com.dancekvartal.webapp.repository.SubjectRepository;
import com.dancekvartal.webapp.repository.TeacherRepository;
import com.dancekvartal.webapp.service.TeacherService;
import com.dancekvartal.webapp.service.dto.TeacherDTO;
import com.dancekvartal.webapp.service.mapper.SubjectMapper;
import com.dancekvartal.webapp.service.mapper.TeacherMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Teacher.
 */
@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

    private final Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);

    private final TeacherRepository teacherRepository;

    private final SubjectRepository subjectRepository;

    private final TeacherMapper teacherMapper;

    private final SubjectMapper subjectMapper;

    public TeacherServiceImpl(TeacherRepository teacherRepository, SubjectRepository subjectRepository,
                              TeacherMapper teacherMapper, SubjectMapper subjectMapper) {
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.teacherMapper = teacherMapper;
        this.subjectMapper = subjectMapper;
    }

    /**
     * Save a teacher.
     *
     * @param teacherDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeacherDTO save(TeacherDTO teacherDTO) {
        log.debug("Request to save Teacher : {}", teacherDTO);
        Teacher teacher = teacherMapper.teacherDTOToTeacher(teacherDTO);

        teacher = teacherRepository.save(teacher);

        TeacherDTO result = teacherMapper.teacherToTeacherDTO(teacher);
        return result;
    }

    /**
     * Get all the teachers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeacherDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Teachers");
        Page<Teacher> teachers = teacherRepository.findAll(pageable);
        Page<TeacherDTO> result = teachers
            .map(teacher -> teacherMapper.teacherToTeacherDTO(teacher));
        result.forEach(teacherDTO ->
            teacherDTO.setSubjects(subjectMapper.subjectsToSubjectDTOs(subjectRepository.findByTeacherId(teacherDTO.getId()))));
        return result;
    }

    /**
     * Get one teacher by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TeacherDTO findOne(Long id) {
        log.debug("Request to get Teacher : {}", id);
        Teacher teacher = teacherRepository.findOne(id);
        TeacherDTO teacherDTO = teacherMapper.teacherToTeacherDTO(teacher);

        if (teacher != null) {
            teacherDTO.setSubjects(subjectMapper.subjectsToSubjectDTOs(subjectRepository.findByTeacherId(teacherDTO.getId())));
        }

        return teacherDTO;
    }

    /**
     * Delete the  teacher by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teacher : {}", id);
        teacherRepository.delete(id);
    }
}
