package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

  @Query("""
      SELECT t FROM Ticket t WHERE (:status IS NULL OR t.status IN :status) \
      AND (:priorities IS NULL OR t.priority IN :priorities) \
      AND (:categories IS NULL OR t.category IN :categories)\
      """)
  List<Ticket> findByStatusInAndPriorityInAndCategoryIn(@Param("status") List<Status> status,
      @Param("priorities") List<Priority> priorities,
      @Param("categories") List<Category> categories);

      long countByCategory(Category category);

      long countByPriority(Priority priority);
    
      long countByStatus(Status status);
}
