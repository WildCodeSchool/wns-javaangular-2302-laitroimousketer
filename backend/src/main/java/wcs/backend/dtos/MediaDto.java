package wcs.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class MediaDto {

    private Long id;
    private String fileName;
    private String fileType;
    private byte[] data; // ou une autre représentation, par exemple String base64

    private Long userId;
    private Long chatid;

}
