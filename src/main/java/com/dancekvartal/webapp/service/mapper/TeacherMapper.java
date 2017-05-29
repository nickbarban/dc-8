package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Teacher;
import com.dancekvartal.webapp.service.dto.TeacherDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PersonMapper.class, SubjectMapper.class})
public interface TeacherMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "subjects", ignore = true)
    TeacherDTO teacherToTeacherDTO(Teacher teacher);

    List<TeacherDTO> teachersToTeacherDTOs(List<Teacher> teachers);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "lessons", ignore = true)
    @Mapping(target = "subjects", ignore = true)
    Teacher teacherDTOToTeacher(TeacherDTO teacherDTO);

    List<Teacher> teacherDTOsToTeachers(List<TeacherDTO> teacherDTOs);

    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Teacher teacherFromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }


}
