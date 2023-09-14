// // package wcs.backend.services;

// // import java.util.List;
// // import java.util.Optional;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.stereotype.Service;

// // import lombok.AllArgsConstructor;
// // import wcs.backend.entities.Category;
// // import wcs.backend.repositories.CategoryRepository;

// // @Service
// // @AllArgsConstructor
// // public class CategoryService {

// //     @Autowired
// //     private CategoryRepository categoryRepository;

// //     public Category createCategory(Category category){
// //         return categoryRepository.save(category);
// //     }

// //     public List<Category> getAllCategories(){
// //         return categoryRepository.findAll();
// //     }

// //     public Category getCategoryById(Long categoryId){
// //         Optional<Category> category = categoryRepository.findById(categoryId);
// //         return category.get();
// //     }

// //     public Category updateCategory(Category category){
// //         Category existingCategory = categoryRepository.findById(category.getId()).get();
// //         existingCategory.setTitle(category.getTitle());
// //         Category updatedCategory = categoryRepository.save(existingCategory);
// //         return updatedCategory;
// //     }

// //     public void deleteCategory(Long categoryId){
// //         categoryRepository.deleteById(categoryId);
// //     }



    
// // }
// package wcs.backend.services;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;
// import java.util.stream.Collectors;

// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import lombok.AllArgsConstructor;
// import wcs.backend.dtos.CategoryDto;
// import wcs.backend.entities.Category;
// import wcs.backend.entities.Ticket;
// import wcs.backend.repositories.CategoryRepository;

// @Service
// @AllArgsConstructor

// public class CategoryService {
    
//     private CategoryRepository categoryRepository;
//     @Autowired
//     private ModelMapper modelMapper;

//     public CategoryDto createCategory(CategoryDto categoryDto) {
//         Category category = modelMapper.map(categoryDto, Category.class);
//         Category savedCategory = categoryRepository.save(category);
//         return modelMapper.map(savedCategory, CategoryDto.class);
//     }

//     public CategoryDto getCategoryById(Long categoryId) {
//         Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
//         return optionalCategory.map(category -> modelMapper.map(category, CategoryDto.class)).orElse(null);
//     }

//     public List<CategoryDto> getAllCategoryDtos() {
//         List<Category> categories = categoryRepository.findAll();
//         return categories.stream().map(category -> modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
//     }
//         public List<Category> getAllCategories(){
//         return categoryRepository.findAll();
//     }
//  public List<CategoryDto> getAllCategoriesWithTickets() {
//     List<Category> categories = categoryRepository.findAll();
//     List<CategoryDto> categoryDtos = new ArrayList<>();
    
//     for (Category category : categories) {
//         CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
//         List<Ticket> tickets = new ArrayList<>(category.getTickets()); // Convertir Set<Ticket> en List<Ticket>
//         categoryDto.setTickets(tickets);
//         categoryDtos.add(categoryDto);
//     }
    
//     return categoryDtos;
// }

//     public CategoryDto updateCategory(CategoryDto categoryDto) {
//         Optional<Category> optionalCategory = categoryRepository.findById(categoryDto.getId());
//         if (optionalCategory.isPresent()) {
//             Category categoryToUpdate = optionalCategory.get();
//             // Mettez à jour les propriétés de l'entité Category en fonction des valeurs du DTO
//             // Par exemple : categoryToUpdate.setTitle(categoryDto.getTitle());
//             // ...
//             Category updatedCategory = categoryRepository.save(categoryToUpdate);
//             return modelMapper.map(updatedCategory, CategoryDto.class);
//         } else {
//             // Gérer le cas où la catégorie n'est pas trouvée
//             return null;
//         }
//     }

//     public void deleteCategory(Long categoryId) {
//         categoryRepository.deleteById(categoryId);
//     }
// }

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
