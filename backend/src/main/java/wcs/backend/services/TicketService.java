package wcs.backend.services;

import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;


import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.repositories.TicketRepository;

@Service
@AllArgsConstructor
public class TicketService {
    
    private TicketRepository ticketRepository;
    private CategoryRepository categoryRepository;
    private StatusRepository statusRepository;
    private PriorityRepository priorityRepository;

    // public Ticket createTicket(Ticket ticket) {
    //     return ticketRepository.save(ticket);
    // }
    
    public Ticket createTicket(Ticket ticket) {
      // Sélectionnez la statut par défaut
      List<Status> defaultStatusList = statusRepository.findByTitle(Status.Title.TO_DO);
      if (defaultStatusList.isEmpty()) {
          throw new EntityNotFoundException("Default status not found");
      }
      Status defaultStatus = defaultStatusList.get(0);
  
      // Sélectionnez la catégorie par défaut
      List<Category> defaultCategoryList = categoryRepository.findByTitle(Category.Title.TECHNICAL_SUPPORT);
      if (defaultCategoryList.isEmpty()) {
          throw new EntityNotFoundException("Default category not found");
      }
      Category defaultCategory = defaultCategoryList.get(0);
  
      // Sélectionnez la priorité par défaut
      List<Priority> defaultPriorityList = priorityRepository.findByTitle(Priority.Title.LOW);
      Priority defaultPriority = null;
      if (defaultPriorityList.isEmpty()) {
      throw new EntityNotFoundException("Default priority not found");
      }
      // Assurez-vous que les champs nuls sont définis sur les valeurs par défaut
      if (ticket.getStatus() == null) {
          ticket.setStatus(defaultStatus);
      }
      if (ticket.getCategory() == null) {
          ticket.setCategory(defaultCategory);
      }
      if (ticket.getPriority() == null) {
          ticket.setPriority(defaultPriority);
      }
  
      // Maintenant, enregistrez le ticket
      return ticketRepository.save(ticket);
  }
  
  
    public Ticket getTicketById(Long ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        return optionalTicket.get();
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket updateTicket(Ticket ticket) {
        Ticket existingTicket = ticketRepository.findById(ticket.getId()).get();
        existingTicket.setTitle(ticket.getTitle());
        existingTicket.setDescription(ticket.getDescription());
        existingTicket.setCategory(ticket.getCategory());
        existingTicket.setPriority(ticket.getPriority());
        existingTicket.setStatus(ticket.getStatus());
        Ticket updatedTicket = ticketRepository.save(existingTicket);
        return updatedTicket;
    }

    public void deleteTicket(Long ticketId) {
        ticketRepository.deleteById(ticketId);
    }
}

