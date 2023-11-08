package wcs.backend.services;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.dtos.PriorityDto;
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

  private TicketRepository ticketRepository;
  private CategoryRepository categoryRepository;
  private StatusRepository statusRepository;
  private PriorityRepository priorityRepository;
  private TicketHaveUsersRepository ticketHaveUsersRepository;

  // public Ticket createTicket(Ticket ticket) {
  // return ticketRepository.save(ticket);
  // }

  public Ticket createTicket(Ticket ticket, User creator) {
    // Sélectionnez la statut par défaut
    List<Status> defaultStatusList = statusRepository.findByStatusTitle(Status.Title.TO_DO);
    if (defaultStatusList.isEmpty()) {
      throw new EntityNotFoundException("Default status not found");
    }
    Status defaultStatus = defaultStatusList.get(0);
    Priority defaultPriority = priorityRepository.findByPriorityTitle(Priority.Title.DEFAULT).get(0);
    Category defaultCategory = categoryRepository.findByCategoryTitle(Category.Title.DEFAULT).get(0);

    // Si le statut spécifié dans le ticket est nul, utilisez le statut par défaut
    if (ticket.getStatus() == null) {
      ticket.setStatus(defaultStatus);
    }
    // Si la catégorie spécifiée dans le ticket est nulle, utilisez "non renseigné"
    // (ou une autre valeur par défaut)
    if (ticket.getCategory() == null) {
      ticket.setCategory(defaultCategory);
    }
    // Si la priorité spécifiée dans le ticket est nulle, utilisez "non renseigné"
    // (ou une autre valeur par défaut)
    if (ticket.getPriority() == null) {
      ticket.setPriority(defaultPriority);
    }
    // Définissez la date de création sur la date actuelle
    ticket.setCreationDate(new Date());
    // Ajoutez l'auteur au ticket
    ticket.setAuthor(creator);
    // Enregistrez d'abord le ticket
    Ticket savedTicket = ticketRepository.save(ticket);

    // Créez une instance de ticketHaveUsers pour l'utilisateur créateur
    TicketHaveUsers ticketHaveUsers = new TicketHaveUsers(creator, savedTicket);

    // Ajoutez l'association à la liste userAssociations du ticket
    savedTicket.getUserAssociations().add(ticketHaveUsers);

    // Enregistrez le ticket mis à jour
    ticketRepository.save(savedTicket);

    return savedTicket;
  }

  public void addUserToTicket(Ticket ticket, User user) {
    // Créez une instance de ticketHaveUsers pour l'utilisateur ajouté
    TicketHaveUsers ticketHaveUsers = new TicketHaveUsers(user, ticket);

    // Enregistrez ticketHaveUsers pour l'utilisateur ajouté
    ticketHaveUsersRepository.save(ticketHaveUsers);
  }

  public Ticket getTicketById(Long ticketId) {
    Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

    // Vérifier si l'Optional contient une valeur
    if (optionalTicket.isPresent()) {
      return optionalTicket.get(); // Retourner la valeur si présente
    } else {
      // Gérer le cas où l'Optional est vide, par exemple, en retournant null ou en
      // lançant une exception
      throw new EntityNotFoundException("Ticket not found with ID: " + ticketId);
    }
  }

  public List<Ticket> getAllTickets() {
    return ticketRepository.findAll();
  }

  public List<TicketDto> getAllTicketsDtos() {
    List<Ticket> tickets = ticketRepository.findAll();
    return tickets.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  private TicketDto convertToDto(Ticket ticket) {
    TicketDto ticketDto = new TicketDto();
    // Copiez les données de l'entité Ticket vers l'objet TicketDto
    ticketDto.setId(ticket.getId());
    ticketDto.setTicketTitle(ticket.getTicketTitle());
    ticketDto.setDescription(ticket.getDescription());
    ticketDto.setArchiveDate(ticket.getArchiveDate());
    ticketDto.setCategoryId(ticket.getCategory().getId());

    // Obtenez le titre de la catégorie depuis l'entité Category
    ticketDto.setCategoryTitle(ticket.getCategory().getCategoryTitle().toString());

    ticketDto.setStatusId(ticket.getStatus().getId());

    // Obtenez le titre du statut depuis l'entité Status
    ticketDto.setStatusTitle(ticket.getStatus().getStatusTitle().toString());
    ticketDto.setPriorityId(ticket.getPriority().getId());
    // Obtenez le titre de la priorité depuis l'entité Priority
    ticketDto.setPriorityTitle(ticket.getPriority().getPriorityTitle().toString());
    ticketDto.setCreationDate(ticket.getCreationDate());
    ticketDto.setUpdateDate(ticket.getUpdateDate());
    // obtenir l'auteur du ticket
    if (ticket.getAuthor() != null) {
      UserDto authorDto = new UserDto(ticket.getAuthor());
      ticketDto.setAuthor(authorDto);
    }
    // Récupérez les informations sur les utilisateurs associés à partir de
    // userAssociations
    List<TicketHaveUsersDto> ticketHaveUsers = ticket.getUserAssociations().stream()
        .map(this::convertTicketHaveUsersToDto)
        .collect(Collectors.toList());
    ticketDto.setTicketHaveUsers(ticketHaveUsers);

    return ticketDto;
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

  public Ticket updateTicket(Ticket ticket) {
    Ticket existingTicket = ticketRepository.findById(ticket.getId()).orElse(null);

    if (existingTicket == null) {
      throw new EntityNotFoundException("Ticket not found with ID: " + ticket.getId());
    }

    existingTicket.setTicketTitle(ticket.getTicketTitle());
    existingTicket.setDescription(ticket.getDescription());
    existingTicket.setCategory(ticket.getCategory());
    existingTicket.setPriority(ticket.getPriority());
    existingTicket.setStatus(ticket.getStatus());

    // Vérifiez si des champs ont été modifiés avant de définir la date de mise à
    // jour
    if (!existingTicket.equals(ticket)) {
      existingTicket.setUpdateDate(new Date()); // Définissez la date de mise à jour sur la date actuelle
    }

    Ticket updatedTicket = ticketRepository.save(existingTicket);
    return updatedTicket;
  }

  public Ticket archiveTicket(Long ticketId) {
    Ticket existingTicket = getTicketById(ticketId);
    existingTicket.setArchiveDate(new Date()); // Définissez la date d'archivage sur la date actuelle
    return ticketRepository.save(existingTicket);
  }

  public Ticket unarchiveTicket(Long ticketId) {
    Ticket existingTicket = getTicketById(ticketId);
    existingTicket.setArchiveDate(null); // Définissez la date d'archivage sur la date actuelle
    return ticketRepository.save(existingTicket);
  }

  public void deleteTicket(Long ticketId) {
    ticketRepository.deleteById(ticketId);
  }

  public List<Ticket> getFilteredTickets(Status.Title statusTitle, Priority.Title priorityTitle,
      Category.Title categoryTitle) {
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

  private Status getStatusByTitle(Status.Title title) {
    List<Status> status = statusRepository.findByStatusTitle(title);
    if (status.isEmpty()) {
      throw new EntityNotFoundException("Status not found with title: " + title);
    }
    return status.get(0);
  }

  private Priority getPriorityByTitle(Priority.Title title) {
    List<Priority> priorities = priorityRepository.findByPriorityTitle(title);
    if (priorities.isEmpty()) {
      throw new EntityNotFoundException("Priority not found with title: " + title);
    }
    return priorities.get(0);
  }

  private Category getCategoryByTitle(Category.Title title) {
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

  public long countTicketsByCategory(Category.Title categoryTitle) {
    Category category = getCategoryByTitle(categoryTitle);
    return ticketRepository.countByCategory(category);
  }

  public long countTicketsByPriority(Priority.Title priorityTitle) {
    Priority priority = getPriorityByTitle(priorityTitle);
    return ticketRepository.countByPriority(priority);
  }

  public long countTicketsByStatus(Status.Title statusTitle) {
    Status status = getStatusByTitle(statusTitle);
    return ticketRepository.countByStatus(status);
  }

}
