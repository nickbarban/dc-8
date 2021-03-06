package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Lesson;
import com.dancekvartal.webapp.service.dto.LessonDTO;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Mapper for the entity Lesson and its DTO LessonDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, StudentMapper.class, SubjectMapper.class})
public interface LessonMapper {

    LessonDTO lessonToLessonDTO(Lesson lesson);

    List<LessonDTO> lessonsToLessonDTOs(List<Lesson> lessons);

    Lesson lessonDTOToLesson(LessonDTO lessonDTO);

    List<Lesson> lessonDTOsToLessons(List<LessonDTO> lessonDTOs);

    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Lesson lessonFromId(Long id) {
        if (id == null) {
            return null;
        }
        Lesson lesson = new Lesson();
        lesson.setId(id);
        return lesson;
    }


}
