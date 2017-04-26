package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Subject;
import com.dancekvartal.webapp.service.dto.SubjectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Subject and its DTO SubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class,})
public interface SubjectMapper {

    SubjectDTO subjectToSubjectDTO(Subject subject);

    List<SubjectDTO> subjectsToSubjectDTOs(List<Subject> subjects);

    @Mapping(target = "students", ignore = true)
    Subject subjectDTOToSubject(SubjectDTO subjectDTO);

    List<Subject> subjectDTOsToSubjects(List<SubjectDTO> subjectDTOs);

    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Subject subjectFromId(Long id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }


}
