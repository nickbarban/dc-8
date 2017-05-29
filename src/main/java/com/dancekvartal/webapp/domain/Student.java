package com.dancekvartal.webapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

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

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @NotNull
    @JoinColumn(unique = true)
    private Person person;

    @ManyToMany
    @NotNull
    @JoinTable(name = "student_subjects",
        joinColumns = @JoinColumn(name = "students_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "subjects_id", referencedColumnName = "id"))
    private Set<Subject> subjects = new HashSet<>();

    @ManyToOne
    private Parent parent;

    @ManyToMany(mappedBy = "students")
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

    public Student active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public User getUser() {
        return user;
    }

    public Student user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Person getPerson() {
        return person;
    }

    public Student person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Student subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Student addSubjects(Subject subject) {
        this.subjects.add(subject);
        subject.getStudents().add(this);
        return this;
    }

    public Student removeSubjects(Subject subject) {
        this.subjects.remove(subject);
        subject.getStudents().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Parent getParent() {
        return parent;
    }

    public Student parent(Parent parent) {
        this.parent = parent;
        return this;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public Student lessons(Set<Lesson> lessons) {
        this.lessons = lessons;
        return this;
    }

    public Student addLessons(Lesson lesson) {
        this.lessons.add(lesson);
        lesson.getStudents().add(this);
        return this;
    }

    public Student removeLessons(Lesson lesson) {
        this.lessons.remove(lesson);
        lesson.getStudents().remove(this);
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
        Student student = (Student) o;
        if (student.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + id +
            ", active='" + active + "'" +
            '}';
    }
}
