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
    private byte[] data; // ou une autre représentation, par exemple String base64
    private String base64Content;
    private String contentType;
    private String url;
    private Long userId;
    private Long chatid;

}
