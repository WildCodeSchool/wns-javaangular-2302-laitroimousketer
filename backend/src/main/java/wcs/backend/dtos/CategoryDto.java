package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.Category.Title;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private Long id;
    private Title categoryTitle;
    private List<Ticket> tickets; // Utilisez List<Ticket> pour stocker plusieurs tickets
    
    public CategoryDto(Long id, Title categoryTitle) {
      
    }
    
    
}
