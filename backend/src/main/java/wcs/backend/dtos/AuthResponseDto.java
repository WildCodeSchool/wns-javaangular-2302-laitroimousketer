package wcs.backend.dtos;

public class AuthResponseDto {

    private String email;
    private String accessToken;
 
 
   public AuthResponseDto(String email, String accessToken) {
    this.email = email;
    this.accessToken = accessToken;
}

 
}
  


