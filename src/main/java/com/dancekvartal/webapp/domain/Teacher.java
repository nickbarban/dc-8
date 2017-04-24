package com.dancekvartal.webapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Person person;

    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    private Set<Subject> subjects = new HashSet<>();

    @OneToMany(mappedBy = "teacher")
    @JsonIgnore
    private Set<Lesson> lessons = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActive() {
        return active;
    }

    public Teacher active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public User getUser() {
        return user;
    }

    public Teacher user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Person getPerson() {
        return person;
    }

    public Teacher person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Teacher subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Teacher addSubjects(Subject subject) {
        this.subjects.add(subject);
        subject.setTeacher(this);
        return this;
    }

    public Teacher removeSubjects(Subject subject) {
        this.subjects.remove(subject);
        subject.setTeacher(null);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Teacher lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Teacher addLessons(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.setTeacher(this);
        return this;
    }

    public Teacher removeLessons(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.setTeacher(null);
        return this;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Teacher teacher = (Teacher) o;
        if (teacher.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, teacher.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + id +
            ", active='" + active + "'" +
            '}';
    }
}
