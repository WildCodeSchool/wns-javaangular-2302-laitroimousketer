package wcs.backend.services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import wcs.backend.dtos.LoginDto;
import wcs.backend.dtos.UserReadDto;
import wcs.backend.entities.User;
import wcs.backend.repositories.UserRepository;
import wcs.backend.security.JwtTokenProvider;

@Service
public class AuthService {
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtTokenProvider jwtTokenProvider;
  @Autowired
  private ModelMapper modelMapper;

  public AuthService(
      JwtTokenProvider jwtTokenProvider,
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  public String login(LoginDto loginDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = jwtTokenProvider.generateToken(authentication);

    return token;
  }

  public UserReadDto getLoggedInUserDetails(String userEmail) {
    // Récupérer les détails de l'utilisateur à partir du repository
    Optional<User> optionalUser = userRepository.findByEmail(userEmail);

    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      // Convertir l'entité User en DTO ou utiliser directement ModelMapper
      UserReadDto userDto = modelMapper.map(user, UserReadDto.class);
      return userDto;
    } else {
      // Gérer le cas où l'utilisateur n'est pas trouvé
      throw new UsernameNotFoundException("User not found");
    }
  }

  public String extractEmailFromToken(String token) {
    return jwtTokenProvider.getUsername(token);
  }
 
}