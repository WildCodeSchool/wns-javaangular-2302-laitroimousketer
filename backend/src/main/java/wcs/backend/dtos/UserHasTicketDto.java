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
    private Long userId; // L'ID de l'utilisateur
    private boolean isCreator; // Le boolean isCreator
}

