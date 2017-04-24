package com.dancekvartal.webapp.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Person entity.
 */
public class PersonDTO implements Serializable {

    private Long id;

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    private LocalDate birthday;

    @NotNull
    private String address;

    @NotNull
    private String phone1;

    @NotNull
    private String phone2;

    private String email;

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

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }
    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhotoUrl() {
        return photoUrl;
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

        PersonDTO personDTO = (PersonDTO) o;

        if ( ! Objects.equals(id, personDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
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
