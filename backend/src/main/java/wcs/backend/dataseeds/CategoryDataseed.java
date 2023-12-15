package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wcs.backend.dtos.CategoryDto;
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

    CategoryDto categoryTechnical = new CategoryDto();
    categoryTechnical.setCategoryTitle("Tecnique");
    categoryService.createCategory(categoryTechnical);

    CategoryDto categoryFeature = new CategoryDto();
    categoryFeature.setCategoryTitle("Fonctionnalité");
    categoryService.createCategory(categoryFeature);

    CategoryDto categoryBilling = new CategoryDto();
    categoryBilling.setCategoryTitle("Facturation");
    categoryService.createCategory(categoryBilling);
  }

}
