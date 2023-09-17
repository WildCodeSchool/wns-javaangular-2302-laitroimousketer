package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserHasTicketDto {
    private Long id;
    private Long userId; 
    private boolean isCreator;
    private String userFirstName;
    private String userLastName;
    public void setIsCreator(boolean isCreator) {
      this.isCreator = isCreator;
  }
  
    // public void setUserName(String string) {
    // }
}

