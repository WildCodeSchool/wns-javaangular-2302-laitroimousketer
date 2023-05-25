package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Category;
import wcs.backend.entities.Ticket;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.services.CategoryService;
import wcs.backend.services.TicketService;

@Component
public class TicketDataseed {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    final int TICKET_NB = 3;

    public void resetData(){
        cleanData();
        loadData();
    }

    private void loadData() {
        
        for (int i = 0; i < this.TICKET_NB; i++) {
            Ticket ticketCreated = new Ticket();
            ticketCreated.setTitle("title_" + i);
            ticketCreated.setDescription("description_" + i);
            //A CHANGER APRES PASSER PAR SERVICE PAS PAR REPOSITORY
            Category categoryUsed = categoryRepository.findByTitle("category_title_1").get(0);
            ticketCreated.setCategory(categoryUsed);
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
