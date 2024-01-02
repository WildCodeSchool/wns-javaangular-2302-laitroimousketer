package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {

    List<Ticket> findByStatus(Status status);

    List<Ticket> findByPriority(Priority priority);

    List<Ticket> findByCategory(Category category);
    

 
    default List<Ticket> findByQuery(String query) {
        return findAll((root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("ticketTitle")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("priority")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("category")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("userId")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("id")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + query.toLowerCase() + "%")
                )
        );
    }        
    long countByCategory(Category category);

    long countByPriority(Priority priority);

    long countByStatus(Status status);

    List<Ticket> findByAuthorId(Long userId);
}
