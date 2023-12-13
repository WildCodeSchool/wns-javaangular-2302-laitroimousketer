package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wcs.backend.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    // Ajoutez des méthodes spécifiques si nécessaire
}
