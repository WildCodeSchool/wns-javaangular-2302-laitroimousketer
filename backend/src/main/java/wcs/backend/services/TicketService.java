package wcs.backend.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.TicketUpdateDto;
import wcs.backend.entities.Address;
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
import wcs.backend.repositories.UserRepository;
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
  private UserRepository userRepository;
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
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));
    return modelMapper.map(ticket, TicketDto.class);
  }

  public TicketDto createTicket(TicketDto ticketDto) {
    Ticket ticket = modelMapper.map(ticketDto, Ticket.class);

    // Vous devez également mapper les entités associées depuis les ID ici
    ticket.setCategory(categoryRepository.findById(ticketDto.getCategory().getId()).orElse(null));
    ticket.setPriority(priorityRepository.findById(ticketDto.getPriority().getId()).orElse(null));
    ticket.setStatus(statusRepository.findById(ticketDto.getStatus().getId()).orElse(null));
    ticket.setCreationDate(new Date());
    ticket = ticketRepository.save(ticket);
    return modelMapper.map(ticket, TicketDto.class);
  }

  public TicketDto updateTicket(Long id, TicketDto ticketDto) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));

    // Copy non-null fields manually from TicketDto to existing Ticket
    if (ticketDto.getTicketTitle() != null) {
      existingTicket.setTicketTitle(ticketDto.getTicketTitle());
    }

    if (ticketDto.getDescription() != null) {
      existingTicket.setDescription(ticketDto.getDescription());
    }

    if (ticketDto.getCategory() != null) {
      existingTicket.setCategory(categoryRepository.findById(ticketDto.getCategory().getId())
          .orElseThrow(() -> new EntityNotFoundException("Category not found")));
    }

    if (ticketDto.getStatus() != null) {
      existingTicket.setStatus(statusRepository.findById(ticketDto.getStatus().getId())
          .orElseThrow(() -> new EntityNotFoundException("Status not found")));
    }

    if (ticketDto.getPriority() != null) {
      existingTicket.setPriority(priorityRepository.findById(ticketDto.getPriority().getId())
          .orElseThrow(() -> new EntityNotFoundException("Priority not found")));
    }
    // Set or clear the archiveDate
    if (ticketDto.getArchiveDate() != null) {
      existingTicket.setArchiveDate(ticketDto.getArchiveDate());
    } else {
      existingTicket.setArchiveDate(null);
    }

    ticketDto.setUpdateDate(new Date());
    // Set the updateDate after manual copying
    existingTicket.setUpdateDate(ticketDto.getUpdateDate());

    // Update associations manually if needed (e.g., ticketHaveUsers)

    // Save the updated Ticket
    Ticket savedTicket = ticketRepository.save(existingTicket);

    // Use ModelMapper for DTO conversion
    TicketDto updatedTicketDto = modelMapper.map(savedTicket, TicketDto.class);

    return updatedTicketDto;
  }

  public void deleteTicket(Long id) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));
    ticketRepository.delete(existingTicket);
  }

  // users to tickets //
  public void addUserToTicket(Ticket ticket, User user) {
    // Créez une instance de ticketHaveUsers pour l'utilisateur ajouté
    TicketHaveUsers ticketHaveUsers = new TicketHaveUsers(user, ticket);

    // Enregistrez ticketHaveUsers pour l'utilisateur ajouté
    ticketHaveUsersRepository.save(ticketHaveUsers);
  }

  // FILTERS //
  public List<TicketDto> getFilteredTickets(Long id, String statusTitle, String priorityTitle, String categoryTitle,
      Long authorId) {
    Specification<Ticket> spec = Specification.where(null);

    if (id != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("id"), id));
    }
    if (statusTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("status"), getStatusByTitle(statusTitle)));
    }
    if (priorityTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("priority"), getPriorityByTitle(priorityTitle)));
    }
    if (categoryTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("category"), getCategoryByTitle(categoryTitle)));
    }
    if (authorId != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("author"), getUserById(authorId)));
    }

    List<Ticket> filteredTickets = ticketRepository.findAll(spec);

    return filteredTickets.stream()
        .map(ticket -> modelMapper.map(ticket, TicketDto.class))
        .collect(Collectors.toList());
  }

  public Specification<Ticket> buildSpecificationForFilter(Long id, String statusTitle, String priorityTitle,
      String categoryTitle, Long authorId) {
    return (root, query, builder) -> {
      List<Predicate> predicates = new ArrayList<>();

      if (id != null) {
        predicates.add(builder.equal(root.get("id"), id));
      }
      if (statusTitle != null) {
        predicates.add(builder.equal(root.get("status"), getStatusByTitle(statusTitle)));
      }
      if (priorityTitle != null) {
        predicates.add(builder.equal(root.get("priority"), getPriorityByTitle(priorityTitle)));
      }
      if (categoryTitle != null) {
        predicates.add(builder.equal(root.get("category"), getCategoryByTitle(categoryTitle)));
      }
      if (authorId != null) {
        predicates.add(builder.equal(root.get("author"), getUserById(authorId)));
      }

      return builder.and(predicates.toArray(new Predicate[0]));
    };
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

  private User getUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    return user;
  }

  // COUNT //
  public long countFilteredTickets(Long id, String statusTitle, String priorityTitle, String categoryTitle,
      Long authorId) {
    Specification<Ticket> spec = Specification.where(null);

    if (id != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("id"), id));
    }
    if (statusTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("status"), getStatusByTitle(statusTitle)));
    }
    if (priorityTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("priority"), getPriorityByTitle(priorityTitle)));
    }
    if (categoryTitle != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("category"), getCategoryByTitle(categoryTitle)));
    }
    if (authorId != null) {
      spec = spec.and((root, query, builder) -> builder.equal(root.get("author"), getUserById(authorId)));
    }

    return ticketRepository.count(spec);
  }

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
