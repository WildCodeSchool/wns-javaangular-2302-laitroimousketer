package wcs.backend.repositories;

import wcs.backend.entities.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    
    default List<User> findByQuery(String query) {
        return findAll((root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstname")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastname")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + query.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("id").get("id")), "%" + query.toLowerCase() + "%")
                )
        );
    }
    default List<User> findByRoleTitle(String query) {
      return findAll((root, criteriaQuery, criteriaBuilder) ->
              criteriaBuilder.like(criteriaBuilder.lower(root.get("role").get("roleTitle")), "%" + query.toLowerCase() + "%")
      );
  }
}
