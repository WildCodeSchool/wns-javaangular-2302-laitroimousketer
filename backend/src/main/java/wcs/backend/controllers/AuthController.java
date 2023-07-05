package wcs.backend.controllers;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.LoginDto;
import wcs.backend.entities.User;
import wcs.backend.services.AuthService;
import wcs.backend.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

  // pas besoin de @Autowired avec @AllArgsConstructor
  private AuthService authService;
  private UserService userService;

  // Build Login REST API
  @PostMapping("/login")
  public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody LoginDto loginDto) {

    try {
      String token = authService.login(loginDto);
      
      JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
      jwtAuthResponse.setAccessToken(token);
      return ResponseEntity.ok(jwtAuthResponse);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/register")
  public ResponseEntity<User> registerUser(@RequestBody User user) {
    try {
      User createdUser = userService.createUser(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(createdUser); // HttpStatus.CREATED (201)
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().build();
    }
  }

}