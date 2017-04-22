package com.dancekvartal.webapp.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Pay entity.
 */
public class PayDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private BigDecimal sum;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    public BigDecimal getSum() {
        return sum;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long personId) {
        this.userId = personId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PayDTO payDTO = (PayDTO) o;

        if ( ! Objects.equals(id, payDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PayDTO{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", sum='" + sum + "'" +
            '}';
    }
}
