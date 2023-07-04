package wcs.backend.controllers;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.LoginDto;
import wcs.backend.services.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    // Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody LoginDto loginDto){
      
      try {
      System.out.println("LoginDto: " + loginDto.getEmail() + " " + loginDto.getPassword());
        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        return ResponseEntity.ok(jwtAuthResponse);
      } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().build();
    }

  }

}