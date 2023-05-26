package wcs.backend.dataseeds;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Category;
import wcs.backend.services.CategoryService;

@Component
public class CategoryDataseed {

    @Autowired
    private CategoryService categoryService;
    final int CATEGORY_NB = 3;

    public void resetData(){
        cleanData();
        loadData();
    }

    private void loadData() {
        
        for (int i = 0; i < this.CATEGORY_NB; i++) {
            Category categoryCreated = new Category();
            categoryCreated.setTitle("category_title_" + i);
            this.categoryService.createCategory(categoryCreated);
        }
     }

    private void cleanData(){
        List<Category> categories = categoryService.getAllCategories();
        for (Category category : categories) {
            categoryService.deleteCategory(category.getId());
        }
    }

}
