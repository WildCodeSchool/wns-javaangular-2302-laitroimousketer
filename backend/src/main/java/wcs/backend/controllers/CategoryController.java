package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.entities.Category;
import wcs.backend.services.CategoryService;

@AllArgsConstructor
@RestController
@RequestMapping("api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

  private CategoryService categoryService;
  private ModelMapper modelMapper;

  // build create category REST API
  @PostMapping
  public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
    Category category = modelMapper.map(categoryDto, Category.class);
    Category savedCategory = categoryService.createCategory(category);
    CategoryDto savedCategoryDto = modelMapper.map(savedCategory, CategoryDto.class);
    return new ResponseEntity<>(savedCategoryDto, HttpStatus.CREATED);
  }

  // build get category by id REST API
  // http://localhost:8080/api/categories/1
  @GetMapping("{id}")
  public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") Long categoryId) {
    Category category = categoryService.getCategoryById(categoryId);
    CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
    return new ResponseEntity<>(categoryDto, HttpStatus.OK);
  }

  // Build Get All categories REST API
  // http://localhost:8080/api/categories
  @GetMapping
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    List<Category> categories = categoryService.getAllCategories();
    List<CategoryDto> categoryDtos = categories.stream()
        .map(category -> modelMapper.map(category, CategoryDto.class))
        .collect(Collectors.toList());
    return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
  }

  // Build Update category REST API
  @PutMapping("{id}")
  // http://localhost:8080/api/categories/1
  public ResponseEntity<CategoryDto> updateCategory(@PathVariable("id") Long categoryId,
      @RequestBody CategoryDto categoryDto) {
    Category category = modelMapper.map(categoryDto, Category.class);
    category.setId(categoryId);
    Category updatedCategory = categoryService.updateCategory(category);
    CategoryDto updatedCategoryDto = modelMapper.map(updatedCategory, CategoryDto.class);
    return new ResponseEntity<>(updatedCategoryDto, HttpStatus.OK);
  }

  // Build Delete category REST API
  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteCategory(@PathVariable("id") Long categoryId) {
    categoryService.deleteCategory(categoryId);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}

