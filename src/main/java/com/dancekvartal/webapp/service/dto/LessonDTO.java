package com.dancekvartal.webapp.service.dto;


import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Lesson entity.
 */
public class LessonDTO implements Serializable {

    private Long id;

    private ZonedDateTime startLesson;

    private ZonedDateTime endLesson;

    private TeacherDTO teacher;

    private Set<StudentDTO> students = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartLesson() {
        return startLesson;
    }

    public void setStartLesson(ZonedDateTime startLesson) {
        this.startLesson = startLesson;
    }

    public ZonedDateTime getEndLesson() {
        return endLesson;
    }

    public void setEndLesson(ZonedDateTime endLesson) {
        this.endLesson = endLesson;
    }

    public Set<StudentDTO> getStudents() {
        return students;
    }

    public void setStudents(Set<StudentDTO> students) {
        this.students = students;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LessonDTO lessonDTO = (LessonDTO) o;

        if (!Objects.equals(id, lessonDTO.id)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "LessonDTO{" +
            "id=" + id +
            ", startLesson='" + startLesson + "'" +
            ", endLesson='" + endLesson + "'" +
            '}';
    }
}
