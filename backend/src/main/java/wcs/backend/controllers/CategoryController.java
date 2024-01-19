package wcs.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.services.CategoryService;

@AllArgsConstructor
@RestController
@RequestMapping("api/categories/")
@CrossOrigin(origins = "*")
@Tag(name = "Categories", description = "Category Management Controller")

public class CategoryController {
  @Autowired
  private CategoryService categoryService;

  @GetMapping
  @Operation(summary = "Get All Categories", description = "Get details of all available categories.")
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    List<CategoryDto> categoryDto = categoryService.getAllCategories();
    return ResponseEntity.ok(categoryDto);
  }

  @GetMapping("{id}")
  @Operation(summary = "Get Category by ID", description = "Get details of a category by its ID.")
  public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long categoryId) {
    CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
    return ResponseEntity.ok(categoryDto);
  }

  @PostMapping
  @Operation(summary = "Create Category", description = "Create a new category.")
  public ResponseEntity<CategoryDto> createStatus(@RequestBody CategoryDto categoryDto) {
    CategoryDto createdCategoryDto = categoryService.createCategory(categoryDto);
    return ResponseEntity.ok(createdCategoryDto);
  }

  @PutMapping("{id}")
  @Operation(summary = "Update Category", description = "Update an existing category.")
  public ResponseEntity<CategoryDto> updateStatus(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
    CategoryDto updatedCategoryDto = categoryService.updateCategory(id, categoryDto);
    return ResponseEntity.ok(updatedCategoryDto);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Delete Category", description = "Delete a category by its ID.")
  public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.noContent().build();
  }
  
}
