// package wcs.backend.ticket;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertThrows;

// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;
// import java.util.Locale;
// import java.util.Random;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.DirtiesContext;
// import org.springframework.test.annotation.DirtiesContext.ClassMode;

// import com.github.javafaker.Faker;

// import jakarta.persistence.EntityNotFoundException;
// import jakarta.transaction.Transactional;
// import wcs.backend.dtos.CategoryDto;
// import wcs.backend.dtos.PriorityDto;
// import wcs.backend.dtos.StatusDto;
// import wcs.backend.dtos.TicketDto;
// import wcs.backend.dtos.UserReadDto;
// import wcs.backend.services.CategoryService;
// import wcs.backend.services.PriorityService;
// import wcs.backend.services.StatusService;
// import wcs.backend.services.TicketService;
// import wcs.backend.services.UserService;

// @SpringBootTest
// public class TicketServiceTest {

//   @Autowired
//   private TicketService ticketService;
//   @Autowired
//   private CategoryService categoryService;
//   @Autowired
//   private PriorityService priorityService;
//   @Autowired
//   private StatusService statusService;
//   @Autowired
//   private UserService userService;

//   @Test
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testCreateTicket() {
    
//     // Création d'un ticket de test
//     Faker faker = new Faker(new Locale("fr"));
//     List<CategoryDto> categories = categoryService.getAllCategories();
//     List<PriorityDto> priorities = priorityService.getAllPriority();
//     List<StatusDto> statuses = statusService.getAllStatus();
//     List<UserReadDto> users = userService.getAllUsers();
//     Random random = new Random();

//     TicketDto ticket = new TicketDto();
//     ticket.setTicketTitle(faker.lorem().word());
//     ticket.setDescription(faker.lorem().paragraph());
//     ticket.setCategory(categories.get(random.nextInt(categories.size())));
//     ticket.setPriority(priorities.get(random.nextInt(priorities.size())));
//     ticket.setStatus(statuses.get(random.nextInt(statuses.size())));
//     ticket.setCreationDate(new Date());
//     ticket.setUpdateDate(null);
//     ticket.setArchiveDate(null);
//     ticket.setAuthor(users.get(random.nextInt(users.size())));
//     ticket.setDevelopers(new ArrayList<>());
//     // Initialisez les propriétés du ticketDto selon vos besoins

//     // Appel de la méthode de création
//     TicketDto createdTicket = ticketService.createTicket(ticket);

//     // Vérification que le ticket a été créé avec succès
//     assertNotNull(createdTicket.getId());
//     // Vous pouvez ajouter d'autres vérifications ici selon vos besoins
//   }

//   @Test
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testUpdateTicket() {
//     Faker faker = new Faker(new Locale("fr"));
//     List<CategoryDto> categories = categoryService.getAllCategories();
//     List<PriorityDto> priorities = priorityService.getAllPriority();
//     List<StatusDto> statuses = statusService.getAllStatus();
//     List<UserReadDto> users = userService.getAllUsers();
//     Random random = new Random();

//     // Création d'un ticket de test existant dans la base de données
//     TicketDto ticket = new TicketDto();
//     ticket.setTicketTitle(faker.lorem().word());
//     ticket.setDescription(faker.lorem().paragraph());
//     ticket.setCategory(categories.get(random.nextInt(categories.size())));
//     ticket.setPriority(priorities.get(random.nextInt(priorities.size())));
//     ticket.setStatus(statuses.get(random.nextInt(statuses.size())));
//     ticket.setCreationDate(new Date());
//     ticket.setUpdateDate(null);
//     ticket.setArchiveDate(null);
//     ticket.setAuthor(users.get(random.nextInt(users.size())));
//     // Initialisez les propriétés du ticketDto selon vos besoins
//     TicketDto createdTicket = ticketService.createTicket(ticket);
//     createdTicket.setDevelopers(new ArrayList<>());
//     // Modification des propriétés du ticket
//     createdTicket.setTicketTitle("Nouveau Titre");
//     createdTicket.setDescription("Nouvelle Description");

//     // Appel de la méthode de mise à jour
//     TicketDto updatedTicket = ticketService.updateTicket(createdTicket.getId(), createdTicket);

//     // Vérification que le ticket a été mis à jour avec succès
//     assertEquals("Nouveau Titre", updatedTicket.getTicketTitle());
//     assertEquals("Nouvelle Description", updatedTicket.getDescription());

//   }

//   @Test
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testGetTicketById() {
//     Faker faker = new Faker(new Locale("fr"));
//     List<CategoryDto> categories = categoryService.getAllCategories();
//     List<PriorityDto> priorities = priorityService.getAllPriority();
//     List<StatusDto> statuses = statusService.getAllStatus();
//     List<UserReadDto> users = userService.getAllUsers();
//     Random random = new Random();
//     // Création d'un ticket de test existant dans la base de données
//     TicketDto ticket = new TicketDto();
//     ticket.setId(faker.number().randomNumber());
//     ticket.setTicketTitle(faker.lorem().word());
//     ticket.setDescription(faker.lorem().paragraph());
//     ticket.setCategory(categories.get(random.nextInt(categories.size())));
//     ticket.setPriority(priorities.get(random.nextInt(priorities.size())));
//     ticket.setStatus(statuses.get(random.nextInt(statuses.size())));
//     ticket.setCreationDate(new Date());
//     ticket.setUpdateDate(null);
//     ticket.setArchiveDate(null);
//     ticket.setAuthor(users.get(random.nextInt(users.size())));
//     ticket.setDevelopers(new ArrayList<>());
//     // Initialisez les propriétés du ticketDto selon vos besoins
//     TicketDto createdTicket = ticketService.createTicket(ticket);

//     // Appel de la méthode de récupération par ID
//     TicketDto retrievedTicket = ticketService.getTicketById(createdTicket.getId());

//     // Vérification que le ticket a été récupéré avec succès
//     assertNotNull(retrievedTicket);
//     assertEquals(createdTicket.getId(), retrievedTicket.getId());
//   }

//   @Test
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testDeleteTicket() {
//     Faker faker = new Faker(new Locale("fr"));
//     List<CategoryDto> categories = categoryService.getAllCategories();
//     List<PriorityDto> priorities = priorityService.getAllPriority();
//     List<StatusDto> statuses = statusService.getAllStatus();
//     List<UserReadDto> users = userService.getAllUsers();
//     Random random = new Random();
//     // Création d'un ticket de test existant dans la base de données
//     TicketDto ticket = new TicketDto();
//     ticket.setId(faker.number().randomNumber());
//     ticket.setTicketTitle(faker.lorem().word());
//     ticket.setDescription(faker.lorem().paragraph());
//     ticket.setCategory(categories.get(random.nextInt(categories.size())));
//     ticket.setPriority(priorities.get(random.nextInt(priorities.size())));
//     ticket.setStatus(statuses.get(random.nextInt(statuses.size())));
//     ticket.setCreationDate(new Date());
//     ticket.setUpdateDate(null);
//     ticket.setArchiveDate(null);
//     ticket.setAuthor(users.get(random.nextInt(users.size())));
//     ticket.setDevelopers(new ArrayList<>());
//     // Initialisez les propriétés du ticketDto selon vos besoins
//     TicketDto createdTicket = ticketService.createTicket(ticket);

//     // Appel de la méthode de suppression
//     ticketService.deleteTicket(createdTicket.getId());

//     // Vérification que le ticket a été supprimé avec succès
//     assertThrows(EntityNotFoundException.class, () -> ticketService.getTicketById(createdTicket.getId()));
//     // Vous pouvez ajouter d'autres vérifications ici selon vos besoins
//   }

// }
