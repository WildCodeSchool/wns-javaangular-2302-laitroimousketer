package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Category.Title;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class CategoryDto {
    private Long id;
    private Title categoryTitle; 
}
