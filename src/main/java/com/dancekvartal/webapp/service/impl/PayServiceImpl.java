package com.dancekvartal.webapp.service.impl;

import com.dancekvartal.webapp.service.PayService;
import com.dancekvartal.webapp.domain.Pay;
import com.dancekvartal.webapp.repository.PayRepository;
import com.dancekvartal.webapp.service.dto.PayDTO;
import com.dancekvartal.webapp.service.mapper.PayMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Pay.
 */
@Service
@Transactional
public class PayServiceImpl implements PayService{

    private final Logger log = LoggerFactory.getLogger(PayServiceImpl.class);
    
    private final PayRepository payRepository;

    private final PayMapper payMapper;

    public PayServiceImpl(PayRepository payRepository, PayMapper payMapper) {
        this.payRepository = payRepository;
        this.payMapper = payMapper;
    }

    /**
     * Save a pay.
     *
     * @param payDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PayDTO save(PayDTO payDTO) {
        log.debug("Request to save Pay : {}", payDTO);
        Pay pay = payMapper.payDTOToPay(payDTO);
        pay = payRepository.save(pay);
        PayDTO result = payMapper.payToPayDTO(pay);
        return result;
    }

    /**
     *  Get all the pays.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PayDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Pays");
        Page<Pay> result = payRepository.findAll(pageable);
        return result.map(pay -> payMapper.payToPayDTO(pay));
    }

    /**
     *  Get one pay by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PayDTO findOne(Long id) {
        log.debug("Request to get Pay : {}", id);
        Pay pay = payRepository.findOne(id);
        PayDTO payDTO = payMapper.payToPayDTO(pay);
        return payDTO;
    }

    /**
     *  Delete the  pay by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pay : {}", id);
        payRepository.delete(id);
    }
}
