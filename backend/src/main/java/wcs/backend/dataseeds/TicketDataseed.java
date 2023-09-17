package wcs.backend.dataseeds;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
import wcs.backend.entities.UserHasTicket;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.services.TicketService;
import wcs.backend.services.UserService;

@Component
public class TicketDataseed {

  @Autowired
  private TicketService ticketService;

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private StatusRepository statusRepository;

  @Autowired
  private PriorityRepository priorityRepository;

  final int TICKET_NB = 20;

  public void resetData() {
    cleanData();
    loadData();
  }

private void loadData() {
    Category technicalSupportCategory = categoryRepository.findByCategoryTitle(Category.Title.TECHNICAL_SUPPORT).get(0);
    Status toDoStatus = statusRepository.findByStatusTitle(Status.Title.TO_DO).get(0);
    Priority lowPriority = priorityRepository.findByPriorityTitle(Priority.Title.LOW).get(0);

    // Récupérez l'utilisateur en fonction du firstname et du lastname
    User creator = userService.getFirstUserByName("jesapel"); // Assurez-vous d'avoir une méthode pour rechercher un utilisateur par firstname et lastname dans votre service UserService.

    if (creator == null) {
        throw new EntityNotFoundException("User not found with firstname: jesapel and lastname: groot");
    }

    for (int i = 0; i < this.TICKET_NB; i++) {
        Ticket ticketCreated = new Ticket();
        ticketCreated.setTicketTitle("title_" + i);
        ticketCreated.setDescription("description_" + i);

        ticketCreated.setCategory(technicalSupportCategory);
        ticketCreated.setStatus(toDoStatus);
        ticketCreated.setPriority(lowPriority);
        ticketCreated.setCreationDate(new Date());

        // Définissez l'utilisateur créateur pour le ticket
        ticketCreated.setCreatorUser(creator); // Vous devez avoir une méthode setCreatorUser(User user) dans votre entité Ticket.

        // Assurez-vous de définir isCreator sur true pour l'utilisateur créateur
        UserHasTicket userHasTicket = new UserHasTicket(creator, ticketCreated, true);

        this.ticketService.createTicket(ticketCreated, creator);
    }
}


  private void cleanData() {
    List<Ticket> tickets = ticketService.getAllTickets();
    for (Ticket ticket : tickets) {
      ticketService.deleteTicket(ticket.getId());
    }
  }
}
