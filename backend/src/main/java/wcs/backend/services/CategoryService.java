package wcs.backend.services;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.entities.Category;
import wcs.backend.repositories.CategoryRepository;

@Service
@AllArgsConstructor
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;
  private ModelMapper modelMapper;

  public List<CategoryDto> getAllCategories() {
    List<Category> categories = categoryRepository.findAll();
    return categories.stream()
        .map(category -> new CategoryDto(category.getId(), category.getCategoryTitle()))
        .collect(Collectors.toList());
  }

  public CategoryDto getCategoryById(Long id) {
    Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    return modelMapper.map(category, CategoryDto.class);
  }

  public CategoryDto createCategory(CategoryDto categoryDto) {
    Category category = modelMapper.map(categoryDto, Category.class);
    category = categoryRepository.save(category);
    return modelMapper.map(category, CategoryDto.class);
  }

  public CategoryDto updateCategory(Long id, CategoryDto categoryDto) {
    Category existingCategory = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(" Category not found with id: " + id));
        
    modelMapper.map(categoryDto, existingCategory);
    existingCategory.setId(id); // Assurez-vous que l'ID reste cohérent
    existingCategory = categoryRepository.save(existingCategory);
    return modelMapper.map(existingCategory, CategoryDto.class);
  }

  public void deleteCategory(Long categoryId) {
    categoryRepository.deleteById(categoryId);
  }

}
