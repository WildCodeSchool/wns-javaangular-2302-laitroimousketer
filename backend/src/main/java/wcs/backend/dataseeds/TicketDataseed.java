package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Ticket;
import wcs.backend.services.TicketService;

@Component
public class TicketDataseed {

    @Autowired
    private TicketService ticketService;
    final int TICKET_NB = 15;

    public void resetData(){
        cleanData();
        loadData();
    }

    private void loadData() {
        
        for (int i = 0; i < this.TICKET_NB; i++) {
            Ticket ticketCreated = new Ticket();
            ticketCreated.setTitle("title_" + i);
            ticketCreated.setDescription("description_" + i);
            this.ticketService.createTicket(ticketCreated);
        }
     }

    private void cleanData(){
        List<Ticket> tickets = ticketService.getAllTickets();
        for (Ticket ticket : tickets) {
            ticketService.deleteTicket(ticket.getId());
        }
    }
}
