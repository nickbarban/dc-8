package com.dancekvartal.webapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Pay.
 */
@Entity
@Table(name = "pay")
public class Pay implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "sum", precision=10, scale=2)
    private BigDecimal sum;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Person user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Pay date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getSum() {
        return sum;
    }

    public Pay sum(BigDecimal sum) {
        this.sum = sum;
        return this;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    public Person getUser() {
        return user;
    }

    public Pay user(Person person) {
        this.user = person;
        return this;
    }

    public void setUser(Person person) {
        this.user = person;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pay pay = (Pay) o;
        if (pay.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, pay.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Pay{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", sum='" + sum + "'" +
            '}';
    }
}
