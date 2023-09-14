package wcs.backend.controllers;

import java.util.List;

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
import wcs.backend.entities.Category;
import wcs.backend.services.CategoryService;

@AllArgsConstructor
@RestController
@RequestMapping("api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

  private CategoryService categoryService;

  // build create category REST API
  @PostMapping
  public ResponseEntity<Category> createcategory(@RequestBody Category category) {
    Category savedcategory = categoryService.createCategory(category);
    return new ResponseEntity<>(savedcategory, HttpStatus.CREATED);
  }

  // build get category by id REST API
  // http://localhost:8080/api/categories/1
  @GetMapping("{id}")
  public ResponseEntity<Category> getcategoryById(@PathVariable("id") Long categoryId) {
    Category category = categoryService.getCategoryById(categoryId);
    return new ResponseEntity<>(category, HttpStatus.OK);
  }

  // Build Get All categorys REST API
  // http://localhost:8080/api/categories
  @GetMapping
  public ResponseEntity<List<Category>> getAllcategorys() {
    List<Category> categories = categoryService.getAllCategories();
    return new ResponseEntity<>(categories, HttpStatus.OK);
  }

  // Build Update category REST API
  @PutMapping("{id}")
  // http://localhost:8080/api/categories/1
  public ResponseEntity<Category> updatecategory(@PathVariable("id") Long categoryId,
      @RequestBody Category category) {
    category.setId(categoryId);
    Category updatedCategory = categoryService.updateCategory(category);
    return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
  }

  // Build Delete category REST API
  @DeleteMapping("{id}")
  public ResponseEntity<String> deletecategory(@PathVariable("id") Long categoryId) {
    categoryService.deleteCategory(categoryId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
// package wcs.backend.controllers;

// import java.util.List;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import lombok.AllArgsConstructor;
// import wcs.backend.dtos.CategoryDto;
// import wcs.backend.services.CategoryService;

// @AllArgsConstructor
// @RestController
// @RequestMapping("api/categories")
// @CrossOrigin(origins = "*")
// public class CategoryController {

// private CategoryService categoryService;

// // build create category REST API
// @PostMapping
// public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto
// categoryDto) {
// CategoryDto savedCategoryDto = categoryService.createCategory(categoryDto);
// return new ResponseEntity<>(savedCategoryDto, HttpStatus.CREATED);
// }

// @GetMapping("{id}")
// public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") Long
// categoryId) {
// CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
// return new ResponseEntity<>(categoryDto, HttpStatus.OK);
// }

// @GetMapping
// public ResponseEntity<List<CategoryDto>> getAllCategoryWithTickets() {
// List<CategoryDto> categoryDtos =
// categoryService.getAllCategoriesWithTickets();
// return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
// }

// @PutMapping("{id}")
// public ResponseEntity<CategoryDto> updateCategory(@PathVariable("id") Long
// categoryId,
// @RequestBody CategoryDto categoryDto) {
// categoryDto.setId(categoryId);
// CategoryDto updatedCategoryDto = categoryService.updateCategory(categoryDto);
// return new ResponseEntity<>(updatedCategoryDto, HttpStatus.OK);
// }

// @DeleteMapping("{id}")
// public ResponseEntity<String> deleteCategory(@PathVariable("id") Long
// categoryId) {
// categoryService.deleteCategory(categoryId);
// return new ResponseEntity<>(HttpStatus.OK);
// }
// }
