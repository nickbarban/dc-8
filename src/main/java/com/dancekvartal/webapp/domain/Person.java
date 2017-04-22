package com.dancekvartal.webapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "phone_1", nullable = false)
    private String phone1;

    @NotNull
    @Column(name = "phone_2", nullable = false)
    private String phone2;

    @Column(name = "email")
    private String email;

    @Column(name = "photo_url")
    private String photoUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public Person firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Person lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public Person birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public Person address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone1() {
        return phone1;
    }

    public Person phone1(String phone1) {
        this.phone1 = phone1;
        return this;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public Person phone2(String phone2) {
        this.phone2 = phone2;
        return this;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getEmail() {
        return email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public Person photoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
        return this;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Person person = (Person) o;
        if (person.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, person.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + id +
            ", firstname='" + firstname + "'" +
            ", lastname='" + lastname + "'" +
            ", birthday='" + birthday + "'" +
            ", address='" + address + "'" +
            ", phone1='" + phone1 + "'" +
            ", phone2='" + phone2 + "'" +
            ", email='" + email + "'" +
            ", photoUrl='" + photoUrl + "'" +
            '}';
    }
}
