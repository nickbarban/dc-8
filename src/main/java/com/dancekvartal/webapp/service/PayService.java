package com.dancekvartal.webapp.service;

import com.dancekvartal.webapp.service.dto.PayDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Pay.
 */
public interface PayService {

    /**
     * Save a pay.
     *
     * @param payDTO the entity to save
     * @return the persisted entity
     */
    PayDTO save(PayDTO payDTO);

    /**
     *  Get all the pays.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PayDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" pay.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PayDTO findOne(Long id);

    /**
     *  Delete the "id" pay.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
