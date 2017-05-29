package com.dancekvartal.webapp.repository;

import com.dancekvartal.webapp.DancekvartalApp;
import com.dancekvartal.webapp.domain.Subject;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Nick Barban
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DancekvartalApp.class)
@Transactional
@Rollback
public class SubjectRepositoryTest {

    private static final Long EXPECTED_TEACHER_ID = 1L;
    private static final int EXPECTED_SUBJECTS_SIZE = 2;

    @Autowired
    private SubjectRepository sut;
    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    public void shouldReturnSubjectForSpecifiedTeacher() {

        List<Subject> fetched = sut.findByTeacherId(EXPECTED_TEACHER_ID);

        Assertions.assertThat(fetched)
            .isNotNull().isNotEmpty()
            .hasSize(EXPECTED_SUBJECTS_SIZE)
            .allMatch(subject -> subject.getTeacher() != null && subject.getTeacher().getId().equals(EXPECTED_TEACHER_ID));
    }

}
