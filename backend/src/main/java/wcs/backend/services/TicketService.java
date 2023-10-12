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
import wcs.backend.dtos.UserHasTicketDto;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
import wcs.backend.entities.UserHasTicket;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.repositories.TicketRepository;
import wcs.backend.repositories.UserHasTicketRepository;

@Service
@AllArgsConstructor
public class TicketService {

  private TicketRepository ticketRepository;
  private CategoryRepository categoryRepository;
  private StatusRepository statusRepository;
  private PriorityRepository priorityRepository;
  private UserHasTicketRepository userHasTicketRepository;

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

    // Enregistrez d'abord le ticket
    Ticket savedTicket = ticketRepository.save(ticket);

    // Créez une instance de UserHasTicket pour l'utilisateur créateur
    UserHasTicket userHasTicket = new UserHasTicket(creator, savedTicket, true);

    // Enregistrez UserHasTicket
    userHasTicketRepository.save(userHasTicket);

    return savedTicket;
  }

  public void addUserToTicket(Ticket ticket, User user) {
    // Créez une instance de UserHasTicket pour l'utilisateur ajouté
    UserHasTicket userHasTicket = new UserHasTicket(user, ticket, false);

    // Enregistrez UserHasTicket pour l'utilisateur ajouté
    userHasTicketRepository.save(userHasTicket);
  }

  public Ticket getTicketById(Long ticketId) {
    Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
    return optionalTicket.get();
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
    ticketDto.setCategoryId(ticket.getCategory().getId());

    // Obtenez le titre de la catégorie depuis l'entité Category
    ticketDto.setCategoryTitle(ticket.getCategory().getCategoryTitle().toString()); // Convertir en chaîne

    ticketDto.setStatusId(ticket.getStatus().getId());

    // Obtenez le titre du statut depuis l'entité Status
    ticketDto.setStatusTitle(ticket.getStatus().getStatusTitle().toString()); // Convertir en chaîne

    ticketDto.setPriorityId(ticket.getPriority().getId());

    // Obtenez le titre de la priorité depuis l'entité Priority
    ticketDto.setPriorityTitle(ticket.getPriority().getPriorityTitle().toString()); // Convertir en chaîne

    ticketDto.setCreationDate(ticket.getCreationDate());
    ticketDto.setUpdateDate(ticket.getUpdateDate());

    // Récupérez les informations sur les utilisateurs associés à partir de
    // userAssociations
    List<UserHasTicketDto> userHasTickets = ticket.getUserAssociations().stream()
        .map(this::convertUserHasTicketToDto)
        .collect(Collectors.toList());
    ticketDto.setUserHasTickets(userHasTickets);

    return ticketDto;
  }

  private UserHasTicketDto convertUserHasTicketToDto(UserHasTicket userHasTicket) {
    UserHasTicketDto userHasTicketDto = new UserHasTicketDto();
    userHasTicketDto.setId(userHasTicket.getId()); // Assurez-vous que l'ID est copié ici
    userHasTicketDto.setUserId(userHasTicket.getUser().getId());
    userHasTicketDto.setIsCreator(userHasTicket.isCreator());

    // Obtenez le prénom et le nom de l'utilisateur
    String userFirstName = userHasTicket.getUser().getFirstName();
    String userLastName = userHasTicket.getUser().getLastName();

    userHasTicketDto.setUserFirstName(userFirstName);
    userHasTicketDto.setUserLastName(userLastName);

    return userHasTicketDto;
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

  public void deleteTicket(Long ticketId) {
    ticketRepository.deleteById(ticketId);
  }


  public List<Ticket> getFilteredTickets(Status.Title statusTitle, Priority.Title priorityTitle, Category.Title categoryTitle) {
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
    List<Status> statuses = statusRepository.findByStatusTitle(title);
    if (statuses.isEmpty()) {
        throw new EntityNotFoundException("Status not found with title: " + title);
    }
    return statuses.get(0);
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
  

}
