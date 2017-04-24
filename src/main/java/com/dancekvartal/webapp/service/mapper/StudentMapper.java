package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Student;
import com.dancekvartal.webapp.service.dto.StudentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PersonMapper.class, SubjectMapper.class, ParentMapper.class,})
public interface StudentMapper {

    @Mapping(source = "user.id", target = "userId")
    StudentDTO studentToStudentDTO(Student student);

    List<StudentDTO> studentsToStudentDTOs(List<Student> students);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "lessons", ignore = true)
    Student studentDTOToStudent(StudentDTO studentDTO);

    List<Student> studentDTOsToStudents(List<StudentDTO> studentDTOs);

    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Student studentFromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }


}
