package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Student;
import com.dancekvartal.webapp.service.dto.StudentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PersonMapper.class, ParentMapper.class,})
public interface StudentMapper {

    @Mapping(source = "user.id", target = "userId")
//    @Mapping(source = "person.id", target = "personId")
//    @Mapping(source = "parent.id", target = "parentId")
    StudentDTO studentToStudentDTO(Student student);

    List<StudentDTO> studentsToStudentDTOs(List<Student> students);

    @Mapping(source = "userId", target = "user")
//    @Mapping(source = "personId", target = "person")
//    @Mapping(source = "parentId", target = "parent")
    Student studentDTOToStudent(StudentDTO studentDTO);

    List<Student> studentDTOsToStudents(List<StudentDTO> studentDTOs);
}
