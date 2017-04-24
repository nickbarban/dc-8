package com.dancekvartal.webapp.service.mapper;

import com.dancekvartal.webapp.domain.*;
import com.dancekvartal.webapp.service.dto.PersonDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PersonMapper {

    @Mapping(target = "pays", ignore = true)
    PersonDTO personToPersonDTO(Person person);

    List<PersonDTO> peopleToPersonDTOs(List<Person> people);

    @Mapping(target = "pays", ignore = true)
    Person personDTOToPerson(PersonDTO personDTO);

    List<Person> personDTOsToPeople(List<PersonDTO> personDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */

    default Person personFromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }


}
