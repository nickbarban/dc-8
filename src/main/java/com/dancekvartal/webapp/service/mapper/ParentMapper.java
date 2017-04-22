package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.Parent;
import com.dancekvartal.webapp.service.dto.ParentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Parent and its DTO ParentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PersonMapper.class,})
public interface ParentMapper {

    @Mapping(source = "user.id", target = "userId")
    ParentDTO parentToParentDTO(Parent parent);

    List<ParentDTO> parentsToParentDTOs(List<Parent> parents);

    @Mapping(source = "userId", target = "user")
    Parent parentDTOToParent(ParentDTO parentDTO);

    List<Parent> parentDTOsToParents(List<ParentDTO> parentDTOs);
}
