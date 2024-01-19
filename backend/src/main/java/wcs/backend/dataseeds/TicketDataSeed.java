package wcs.backend.dataseeds;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.dtos.PriorityDto;
import wcs.backend.dtos.StatusDto;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.UserReadDto;
import wcs.backend.services.CategoryService;
import wcs.backend.services.PriorityService;
import wcs.backend.services.StatusService;
import wcs.backend.services.TicketService;
import wcs.backend.services.UserService;

import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Component
public class TicketDataSeed {
  @Autowired
  private TicketService ticketService;
  @Autowired
  private CategoryService categoryService;
  @Autowired
  private PriorityService priorityService;
  @Autowired
  private StatusService statusService;
  @Autowired
  private UserService userService;
  

  public void resetData() {
    if (ticketService.getAllTicketsDtos().isEmpty()) {
      generateTickets(200); // Appel direct à generateUsers() s'il n'y a pas d'utilisateurs
    }
  }
  
  public void generateTickets(int numberOfTickets) {
    Faker faker = new Faker(new Locale("fr"));
    List<CategoryDto> categories = categoryService.getAllCategories();
    List<PriorityDto> priorities = priorityService.getAllPriority();
    List<StatusDto> statuses = statusService.getAllStatus();
    List<UserReadDto> users = userService.getAllUsers();
    Random random = new Random();

    for (int i = 0; i < numberOfTickets; i++) {
      TicketDto ticket = new TicketDto();
      ticket.setTicketTitle(faker.lorem().word());
      ticket.setDescription(faker.lorem().paragraph());
      ticket.setCategory(categories.get(random.nextInt(categories.size())));
      ticket.setPriority(priorities.get(random.nextInt(priorities.size())));
      ticket.setStatus(statuses.get(random.nextInt(statuses.size())));
      ticket.setCreationDate(new Date());
      ticket.setUpdateDate(null);
      ticket.setArchiveDate(null);
      ticket.setAuthor(users.get(random.nextInt(users.size())));

      ticketService.createTicket(ticket);
    }
  }
}