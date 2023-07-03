package wcs.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wcs.backend.dtos.AuthRequestDto;
import wcs.backend.dtos.AuthResponseDto;
import wcs.backend.entities.User;
import wcs.backend.security.JwtToken;

@RestController
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserDetailsService userDetailsService;
  private final JwtToken jwtTokenProvider;

@Autowired
  public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtToken jwtTokenProvider) {
    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @PostMapping("/auth")
  public ResponseEntity<?> login(@RequestBody @Validated AuthRequestDto request) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

      User user = (User) authentication.getPrincipal();
      String accessToken = jwtTokenProvider.generateAccessToken(user);
      AuthResponseDto response = new AuthResponseDto(user.getEmail(), accessToken);
      return ResponseEntity.ok().body(response);

    } catch (BadCredentialsException ex) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
}


