package wcs.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Category;
import wcs.backend.repositories.CategoryRepository;

@Service
@AllArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryId){
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.get();
    }

    public Category updateCategory(Category category){
        Category existingCategory = categoryRepository.findById(category.getId()).get();
        existingCategory.setTitle(category.getTitle());
        Category updatedCategory = categoryRepository.save(existingCategory);
        return updatedCategory;
    }

    public void deleteCategory(Long categoryId){
        categoryRepository.deleteById(categoryId);
    }



    
}
