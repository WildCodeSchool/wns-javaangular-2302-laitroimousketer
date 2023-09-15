package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wcs.backend.entities.Category;
import wcs.backend.entities.Category.Title;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByTitle(Title Title);
    
}
