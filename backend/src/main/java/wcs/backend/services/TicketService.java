package wcs.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Ticket;
import wcs.backend.repositories.TicketRepository;

@Service
@AllArgsConstructor
public class TicketService {
    
    private TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket getTicketById(Long ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        return optionalTicket.get();
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket updateTicket(Ticket ticket) {
        Ticket existingTicket = ticketRepository.findById(ticket.getId()).get();
        existingTicket.setDescription(ticket.getDescription());
        Ticket updatedTicket = ticketRepository.save(existingTicket);
        return updatedTicket;
    }

    public void deleteTicket(Long ticketId) {
        ticketRepository.deleteById(ticketId);
    }
}

