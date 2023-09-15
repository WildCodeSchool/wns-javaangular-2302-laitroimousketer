package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.services.TicketService;

@Component
public class TicketDataseed {

    @Autowired
    private TicketService ticketService;


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private PriorityRepository priorityRepository;

    final int TICKET_NB = 20;

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
            Category categoryUsed = categoryRepository.findByTitle(Category.Title.TECHNICAL_SUPPORT).get(0);
            ticketCreated.setCategory(categoryUsed);

            Status statusUsed = statusRepository.findByTitle(Status.Title.TO_DO).get(0);
            ticketCreated.setStatus(statusUsed);

            Priority priorityUsed = priorityRepository.findByTitle(Priority.Title.LOW).get(0);
            ticketCreated.setPriority(priorityUsed);
            
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
