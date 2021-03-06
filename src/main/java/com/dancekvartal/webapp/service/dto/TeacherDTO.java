package com.dancekvartal.webapp.service.dto;


import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Teacher entity.
 */
public class TeacherDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean active;

    private Long userId;

    @NotNull
    private PersonDTO person;

    private Set<SubjectDTO> subjects = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }

    public Set<SubjectDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(Collection<SubjectDTO> subjects) {
        this.subjects.clear();
        this.subjects.addAll(subjects);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherDTO teacherDTO = (TeacherDTO) o;

        if (!Objects.equals(id, teacherDTO.id)) {
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
        return "TeacherDTO{" +
            "id=" + id +
            ", active='" + active + "'" +
            '}';
    }
}
