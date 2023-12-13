package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.repositories.TicketHaveUsersRepository;

;


@Component
public class TicketHaveUsersDataseed {
   @Autowired
    private TicketHaveUsersRepository ticketHaveUsersRepository;

    public void cleanData() {
        // Supprimez toutes les entrées de la table user_has_ticket
        ticketHaveUsersRepository.deleteAll();
    }

}
