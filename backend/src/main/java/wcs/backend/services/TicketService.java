package wcs.backend.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;


import org.springframework.stereotype.Service;


import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
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
    //     return ticketRepository.save(ticket);
    // }
    
    public Ticket createTicket(Ticket ticket, User creator) {
      // Sélectionnez la statut par défaut
      List<Status> defaultStatusList = statusRepository.findByStatusTitle(Status.Title.TO_DO);
      if (defaultStatusList.isEmpty()) {
          throw new EntityNotFoundException("Default status not found");
      }
      Status defaultStatus = defaultStatusList.get(0);
  
      // Sélectionnez la catégorie par défaut
      List<Category> defaultCategoryList = categoryRepository.findByCategoryTitle(Category.Title.TECHNICAL_SUPPORT);
      if (defaultCategoryList.isEmpty()) {
          throw new EntityNotFoundException("Default category not found");
      }
      Category defaultCategory = defaultCategoryList.get(0);
  
      // Sélectionnez la priorité par défaut
      List<Priority> defaultPriorityList = priorityRepository.findByPriorityTitle(Priority.Title.LOW);
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
  
  
  
    public Ticket getTicketById(Long ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        return optionalTicket.get();
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
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
  
      // Vérifiez si des champs ont été modifiés avant de définir la date de mise à jour
      if (!existingTicket.equals(ticket)) {
          existingTicket.setUpdateDate(new Date()); // Définissez la date de mise à jour sur la date actuelle
      }
  
      Ticket updatedTicket = ticketRepository.save(existingTicket);
      return updatedTicket;
  }
  
  
    public void deleteTicket(Long ticketId) {
        ticketRepository.deleteById(ticketId);
    }
}

