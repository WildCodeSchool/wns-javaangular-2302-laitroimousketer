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
import wcs.backend.dtos.UserReadDto;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;

import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.repositories.TicketRepository;
import wcs.backend.repositories.UserRepository;

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
  private UserRepository userRepository;
  @Autowired
  private ModelMapper modelMapper;

  public TicketService() {

  }

  // GET ALL//
  public List<TicketDto> getAllTicketsDtos() {
    List<Ticket> tickets = ticketRepository.findAll();
    return tickets.stream()
        .map(ticket -> modelMapper.map(ticket, TicketDto.class))
        .collect(Collectors.toList());
  }

  // GET BY ID//
  public TicketDto getTicketById(Long id) {
    Ticket ticket = ticketRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));
    return modelMapper.map(ticket, TicketDto.class);
  }

  // CREATE//
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

  // UPDATE//
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

    // Update developers in the ticket directly
    if (ticketDto.getDevelopers() != null) {
      List<User> updatedDevelopers = userRepository.findAllById(
          ticketDto.getDevelopers().stream().map(UserReadDto::getId).collect(Collectors.toList()));
      existingTicket.setDevelopers(updatedDevelopers);
    } else {
      existingTicket.getDevelopers().clear();
    }

    // Set or clear the archiveDate
    existingTicket.setArchiveDate(ticketDto.getArchiveDate());

    // Set the updateDate after manual copying
    ticketDto.setUpdateDate(new Date());
    existingTicket.setUpdateDate(ticketDto.getUpdateDate());

    // Save the updated Ticket
    Ticket savedTicket = ticketRepository.save(existingTicket);

    // Use ModelMapper for DTO conversion
    TicketDto updatedTicketDto = modelMapper.map(savedTicket, TicketDto.class);

    return updatedTicketDto;
  }

  // DELETE//
  public void deleteTicket(Long id) {
    Ticket existingTicket = ticketRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));
    ticketRepository.delete(existingTicket);
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

  public List<TicketDto> getTicketsByQuery(String query) {
    List<Ticket> tickets = ticketRepository.findByQuery(query);
    return tickets.stream()
        .map(ticket -> modelMapper.map(ticket, TicketDto.class))
        .collect(Collectors.toList());
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

  public void dissociateTicketsByUser(User user) {
    List<Ticket> userTickets = ticketRepository.findByAuthorId(user.getId());

    for (Ticket ticket : userTickets) {
      ticket.setAuthor(null);
    }
  }

}
