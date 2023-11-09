package wcs.backend.controllers;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.LoginDto;
import wcs.backend.entities.User;
import wcs.backend.services.AuthService;
import wcs.backend.services.UserService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "User Authentication and Registration Controller")

public class AuthController {

  // pas besoin de @Autowired avec @AllArgsConstructor
  private AuthService authService;
  private UserService userService;

  
  @PostMapping("/login")
  @Operation(summary = "User Login", description = "Authenticate a user and generate an access token.")
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
@Operation(summary = "User Registration", description = "Register a new user.")
public ResponseEntity<Object> registerUser(@RequestBody User user) {
  try {
    User createdUser = userService.createUser(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  } catch (DataIntegrityViolationException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà existant");
  } catch (Exception e) {
    e.printStackTrace();
    return ResponseEntity.badRequest().build();
  }
}

}