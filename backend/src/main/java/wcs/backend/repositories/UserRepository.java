package wcs.backend.repositories;

import wcs.backend.entities.User;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(String firstname, String lastname);
    Optional<User> findByEmail(String email);
    Optional<User> findByfirstnameOrLastnameOrEmail(String firstname, String lastname, String email);
    Boolean existsByEmail(String email);
}