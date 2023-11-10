package wcs.backend.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import wcs.backend.dtos.TicketDto;
import wcs.backend.entities.Ticket;

@Mapper(componentModel = "spring")
@Component
public interface TicketMapper {

    TicketDto ticketToTicketDto(Ticket ticket);

    Ticket ticketDtoToTicket(TicketDto ticketDto);
}
