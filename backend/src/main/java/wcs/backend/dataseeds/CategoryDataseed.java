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


  public void resetData() {
    cleanData();
    loadData();
  }

  private void loadData() {

    Category categoryTodoCreated = new Category();
    categoryTodoCreated.setTitle(Category.Title.TECHNICAL_SUPPORT);
    categoryService.createCategory(categoryTodoCreated);

    Category categoryTodoCreated2 = new Category();
    categoryTodoCreated2.setTitle(Category.Title.FEATURE_REQUEST);
    categoryService.createCategory(categoryTodoCreated2);

    Category categoryTodoCreated3 = new Category();
    categoryService.createCategory(categoryTodoCreated3);
    categoryTodoCreated3.setTitle(Category.Title.BILLING_PAYMENT);
  }

  private void cleanData() {
    List<Category> categories = categoryService.getAllCategories();
    for (Category category : categories) {
      categoryService.deleteCategory(category.getId());
    }
  }

}
