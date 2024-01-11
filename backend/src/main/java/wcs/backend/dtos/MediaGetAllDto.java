package wcs.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class MediaGetAllDto {

    private Long id;
    private String fileName;
    private String contentType;
    private String url;
    private Long userId;
    private Long chatid;

}
