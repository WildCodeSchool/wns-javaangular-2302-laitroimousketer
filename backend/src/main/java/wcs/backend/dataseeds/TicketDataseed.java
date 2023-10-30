package wcs.backend.dataseeds;

import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Role;
import wcs.backend.entities.Role.Title;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.RoleRepository;
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
  private RoleRepository roleRepository;
  
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
  private User getRandomClientUser() {
    List<Role> clientRoles = roleRepository.findByRoleTitle(Title.CLIENT);

    if (clientRoles.isEmpty()) {
        throw new EntityNotFoundException("Role not found: CLIENT");
    }

    Role role = clientRoles.get(0); // Assuming you want the first role if there are multiple

    List<User> clientUsers = userService.getUsersByRole(role);

    if (clientUsers.isEmpty()) {
        throw new EntityNotFoundException("No users found with role: CLIENT");
    }

    Random random = new Random();
    return clientUsers.get(random.nextInt(clientUsers.size()));
}


  private void loadData() {
    List<Category> technicalCategories = categoryRepository.findByCategoryTitle(Category.Title.TECHNICAL);
    List<Category> featureCategories = categoryRepository.findByCategoryTitle(Category.Title.FEATURE);
    List<Category> billingCategories = categoryRepository.findByCategoryTitle(Category.Title.BILLING);

    List<Status> toDoStatus = statusRepository.findByStatusTitle(Status.Title.TO_DO);
    List<Status> doingStatus = statusRepository.findByStatusTitle(Status.Title.DOING);
    List<Status> doneStatus = statusRepository.findByStatusTitle(Status.Title.DONE);

    List<Priority> lowPriorities = priorityRepository.findByPriorityTitle(Priority.Title.LOW);
    List<Priority> mediumPriorities = priorityRepository.findByPriorityTitle(Priority.Title.MEDIUM);
    List<Priority> highPriorities = priorityRepository.findByPriorityTitle(Priority.Title.HIGH);

    Random random = new Random();
    for (int i = 0; i < this.TICKET_NB; i++) {
      Ticket ticketCreated = new Ticket();
      ticketCreated.setTicketTitle("title_" + i);
      ticketCreated.setDescription("Votre description ici.");

      // Utilisation de valeurs aléatoires pour la catégorie, le statut et la priorité
      Category[] categories = {
          getRandomElement(technicalCategories),
          getRandomElement(featureCategories),
          getRandomElement(billingCategories)
      };
      ticketCreated.setCategory(categories[random.nextInt(categories.length)]);

      Status[] status = {
          getRandomElement(toDoStatus),
          getRandomElement(doingStatus),
          getRandomElement(doneStatus)
      };
      ticketCreated.setStatus(status[random.nextInt(status.length)]);

      Priority[] priorities = {
          getRandomElement(lowPriorities),
          getRandomElement(mediumPriorities),
          getRandomElement(highPriorities)
      };
      ticketCreated.setPriority(priorities[random.nextInt(priorities.length)]);

      ticketCreated.setCreationDate(new Date());

      User creator = getRandomClientUser();

      this.ticketService.createTicket(ticketCreated, creator);
  }
}

// Méthode utilitaire pour récupérer un élément aléatoire d'une liste
private <T> T getRandomElement(List<T> list) {
    if (list.isEmpty()) {
        throw new EntityNotFoundException("List is empty");
    }
    Random random = new Random();
    return list.get(random.nextInt(list.size()));
}

  private void cleanData() {
    List<Ticket> tickets = ticketService.getAllTickets();
    for (Ticket ticket : tickets) {
      ticketService.deleteTicket(ticket.getId());
    }
  }
}
