package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.Category;
import wcs.backend.services.CategoryService;

@Component
public class CategoryDataseed {

  @Autowired
  private CategoryService categoryService;

  public void resetData() {
    if (categoryService.getAllCategories().isEmpty()) {
      loadData();
    }
  }

  private void loadData() {

    Category categoryTodoCreated = new Category();
    categoryTodoCreated.setCategoryTitle(Category.Title.TECHNICAL);
    categoryService.createCategory(categoryTodoCreated);

    Category categoryTodoCreated2 = new Category();
    categoryTodoCreated2.setCategoryTitle(Category.Title.FEATURE);
    categoryService.createCategory(categoryTodoCreated2);

    Category categoryTodoCreated3 = new Category();
    categoryTodoCreated3.setCategoryTitle(Category.Title.BILLING);
    categoryService.createCategory(categoryTodoCreated3);
  }

}
