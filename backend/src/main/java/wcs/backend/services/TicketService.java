package wcs.backend.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import wcs.backend.dtos.StatusDto;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.TicketHaveUsersDto;
import wcs.backend.dtos.UserDto;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
import wcs.backend.entities.TicketHaveUsers;

import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.repositories.TicketRepository;
import wcs.backend.repositories.TicketHaveUsersRepository;

@Service
@AllArgsConstructor

public class TicketService {
  @Autowired
  private TicketRepository ticketRepository;

  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private StatusRepository statusRepository;
  @Autowired
  private PriorityRepository priorityRepository;
  @Autowired
  private TicketHaveUsersRepository ticketHaveUsersRepository;
  @Autowired
  private ModelMapper modelMapper;

  public TicketService() {

  }

  public List<TicketDto> getAllTicketsDtos() {
    List<Ticket> tickets = ticketRepository.findAll();
    return tickets.stream()
        .map(ticket -> modelMapper.map(ticket, TicketDto.class))
        .collect(Collectors.toList());
  }

  public TicketDto getTicketById(Long id) {
    Ticket ticket = ticketRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Status not found with id: " + id));
    return modelMapper.map(ticket, TicketDto.class);
  }

  public TicketDto createTicket(TicketDto ticketDto) {
    Ticket ticket = modelMapper.map(ticketDto, Ticket.class);

    // Vous devez également mapper les entités associées depuis les ID ici
    ticket.setCategory(categoryRepository.findById(ticketDto.getCategoryId()).orElse(null));
    ticket.setPriority(priorityRepository.findById(ticketDto.getPriorityId()).orElse(null));
    ticket.setStatus(statusRepository.findById(ticketDto.getStatusId()).orElse(null));
    ticket.setCreationDate(new Date());
    ticket = ticketRepository.save(ticket);
    return modelMapper.map(ticket, TicketDto.class);
  }

  public TicketDto updateTicket(Long id, TicketDto ticketDto) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    // Utilisation de ModelMapper pour mettre à jour le ticket existant avec les
    // données du ticketDto
    modelMapper.map(ticketDto, existingTicket);
    Ticket savedTicket = ticketRepository.save(existingTicket);
    return modelMapper.map(savedTicket, TicketDto.class);
  }

  public TicketDto archiveTicket(Long id) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    existingTicket.setArchiveDate(new Date()); // Set the archiving date to the current date
    Ticket archivedTicket = ticketRepository.save(existingTicket);
    return modelMapper.map(archivedTicket, TicketDto.class); // Convert Ticket to TicketDto
  }

  public TicketDto unarchiveTicket(Long id) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
    existingTicket.setArchiveDate(null); // Remove the archiving date
    Ticket unarchivedTicket = ticketRepository.save(existingTicket);
    return modelMapper.map(unarchivedTicket, TicketDto.class); // Convert Ticket to TicketDto
  }

  public void deleteTicket(Long id) {
    ticketRepository.deleteById(id);
  }

  // users to tickets //
  public void addUserToTicket(Ticket ticket, User user) {
    // Créez une instance de ticketHaveUsers pour l'utilisateur ajouté
    TicketHaveUsers ticketHaveUsers = new TicketHaveUsers(user, ticket);

    // Enregistrez ticketHaveUsers pour l'utilisateur ajouté
    ticketHaveUsersRepository.save(ticketHaveUsers);
  }

  private TicketHaveUsersDto convertTicketHaveUsersToDto(TicketHaveUsers ticketHaveUsers) {
    TicketHaveUsersDto TicketHaveUsersDto = new TicketHaveUsersDto();
    TicketHaveUsersDto.setId(ticketHaveUsers.getId()); // Assurez-vous que l'ID est copié ici
    TicketHaveUsersDto.setUserId(ticketHaveUsers.getUser().getId());

    // Obtenez le prénom et le nom de l'utilisateur
    String userFirstname = ticketHaveUsers.getUser().getFirstname();
    String userLastname = ticketHaveUsers.getUser().getLastname();

    TicketHaveUsersDto.setUserFirstname(userFirstname);
    TicketHaveUsersDto.setUserLastname(userLastname);

    return TicketHaveUsersDto;
  }

  // FILTERS //
  public List<Ticket> getFilteredTickets(String statusTitle, String priorityTitle, String categoryTitle) {
    Specification<Ticket> spec = Specification.where(null);

    if (statusTitle != null) {
      Status status = getStatusByTitle(statusTitle);
      spec = spec.and((root, query, builder) -> builder.equal(root.get("status"), status));
    }

    if (priorityTitle != null) {
      Priority priority = getPriorityByTitle(priorityTitle);
      spec = spec.and((root, query, builder) -> builder.equal(root.get("priority"), priority));
    }

    if (categoryTitle != null) {
      Category category = getCategoryByTitle(categoryTitle);
      spec = spec.and((root, query, builder) -> builder.equal(root.get("category"), category));
    }

    return ticketRepository.findAll(spec);
  }

  private Status getStatusByTitle(String StatusTitle) {
    Status status = statusRepository.findByStatusTitle(StatusTitle);
    if (StatusTitle == null) {
      throw new EntityNotFoundException("Status not found with title: " + StatusTitle);
    }
    return status;
  }

  private Priority getPriorityByTitle(String title) {
    List<Priority> priorities = priorityRepository.findByPriorityTitle(title);
    if (priorities.isEmpty()) {
      throw new EntityNotFoundException("Priority not found with title: " + title);
    }
    return priorities.get(0);
  }

  private Category getCategoryByTitle(String title) {
    List<Category> categories = categoryRepository.findByCategoryTitle(title);
    if (categories.isEmpty()) {
      throw new EntityNotFoundException("Category not found with title: " + title);
    }
    return categories.get(0);
  }

  // COUNT //
  public long countAllTickets() {
    return ticketRepository.count();
  }

  public long countTicketsByCategory(String categoryTitle) {
    Category category = getCategoryByTitle(categoryTitle);
    return ticketRepository.countByCategory(category);
  }

  public long countTicketsByPriority(String priorityTitle) {
    Priority priority = getPriorityByTitle(priorityTitle);
    return ticketRepository.countByPriority(priority);
  }

  public long countTicketsByStatus(String statusTitle) {
    Status status = getStatusByTitle(statusTitle);
    return ticketRepository.countByStatus(status);
  }

}
