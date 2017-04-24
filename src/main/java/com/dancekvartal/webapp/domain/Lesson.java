package com.dancekvartal.webapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_lesson")
    private ZonedDateTime startLesson;

    @Column(name = "end_lesson")
    private ZonedDateTime endLesson;

    @ManyToOne(optional = false)
    @NotNull
    private Teacher teacher;

    @ManyToMany
    @JoinTable(name = "lesson_students",
               joinColumns = @JoinColumn(name="lessons_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="students_id", referencedColumnName="id"))
    private Set<Student> students = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartLesson() {
        return startLesson;
    }

    public Lesson startLesson(ZonedDateTime startLesson) {
        this.startLesson = startLesson;
        return this;
    }

    public void setStartLesson(ZonedDateTime startLesson) {
        this.startLesson = startLesson;
    }

    public ZonedDateTime getEndLesson() {
        return endLesson;
    }

    public Lesson endLesson(ZonedDateTime endLesson) {
        this.endLesson = endLesson;
        return this;
    }

    public void setEndLesson(ZonedDateTime endLesson) {
        this.endLesson = endLesson;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Lesson teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Lesson students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Lesson addStudents(Student student) {
        this.students.add(student);
        student.getLessons().add(this);
        return this;
    }

    public Lesson removeStudents(Student student) {
        this.students.remove(student);
        student.getLessons().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lesson lesson = (Lesson) o;
        if (lesson.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, lesson.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + id +
            ", startLesson='" + startLesson + "'" +
            ", endLesson='" + endLesson + "'" +
            '}';
    }
}
