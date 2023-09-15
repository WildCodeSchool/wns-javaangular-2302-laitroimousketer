package wcs.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private Long id;
    private String title;
    private String description;
    private Long categoryId; 
    private String categoryTitle;
    private Long statusId;
    private String statusTitle;
    private Long priorityId;
    private String priorityTitle;
}
