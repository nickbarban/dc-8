package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.*;
import com.dancekvartal.webapp.service.dto.PayDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Pay and its DTO PayDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, })
public interface PayMapper {

    PayDTO payToPayDTO(Pay pay);

    List<PayDTO> paysToPayDTOs(List<Pay> pays);

    Pay payDTOToPay(PayDTO payDTO);

    List<Pay> payDTOsToPays(List<PayDTO> payDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Pay payFromId(Long id) {
        if (id == null) {
            return null;
        }
        Pay pay = new Pay();
        pay.setId(id);
        return pay;
    }


}
