package wcs.backend.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import wcs.backend.entities.User;
import wcs.backend.dtos.UserDto;
import wcs.backend.dtos.UserReadDto;
import wcs.backend.entities.Role;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@AllArgsConstructor
public class UserService {
  @Autowired
  private final UserRepository userRepository;
  @Autowired
  private final RoleRepository roleRepository;
  @Autowired
  private final PasswordEncoder passwordEncoder;
  @Autowired
  private final ModelMapper modelMapper;
 @Autowired
  private final TicketService ticketService;

  // GET
  public List<UserReadDto> getAllUsers() {
    List<User> users = userRepository.findAll();
    return users.stream()
        .map(user -> modelMapper.map(user, UserReadDto.class))
        .collect(Collectors.toList());
  }

  public UserReadDto getUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    return modelMapper.map(user, UserReadDto.class);
  }

  // POST
  public UserDto createUser(UserDto userDto) {
    User user = modelMapper.map(userDto, User.class);
    String encryptedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encryptedPassword);

    // Vérifier si un rôle est fourni dans les données d'entrée
    if (userDto.getRole() != null && userDto.getRole().getId() != null) {
      Role providedRole = roleRepository.findById(userDto.getRole().getId()).orElse(null);
      if (providedRole != null) {
        // Utiliser le rôle fourni dans les données d'entrée
        user.setRole(providedRole);
      }
    } else {
      // Si aucun rôle n'est fourni, définir le rôle par défaut (CLIENT)
      Role defaultRole = roleRepository.findByRoleTitle("CLIENT");
      if (defaultRole != null) {
        user.setRole(defaultRole);
      }
    }

    User savedUser = userRepository.save(user);
    return modelMapper.map(savedUser, UserDto.class);
  }

  // PUT
  public UserDto updateUser(Long id, UserDto userDto) {
    User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    if (existingUser != null) {
      if (userDto.getFirstname() != null) {
        existingUser.setFirstname(userDto.getFirstname());
      }

      if (userDto.getLastname() != null) {
        existingUser.setLastname(userDto.getLastname());
      }

      if (userDto.getEmail() != null) {
        existingUser.setEmail(userDto.getEmail());
      }
      
      if (userDto.getPhone() != null) {
        existingUser.setPhone(userDto.getPhone());
      }

      if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
        String encryptedPassword = passwordEncoder.encode(userDto.getPassword());
        existingUser.setPassword(encryptedPassword);
      }

      if (userDto.getRole() != null && userDto.getRole().getId() != null) {
        Role role = roleRepository.findById(userDto.getRole().getId()).orElse(null);
        existingUser.setRole(role);
      }

      User updatedUser = userRepository.save(existingUser);
      return modelMapper.map(updatedUser, UserDto.class);
    }
    return null;
  }

  // Méthodes de recherche

  public List<UserReadDto> getUsersByQuery(String query) {
    return userRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
      String pattern = "%" + query.toLowerCase() + "%";
      return criteriaBuilder.or(
          criteriaBuilder.like(criteriaBuilder.lower(root.get("firstname")), pattern),
          criteriaBuilder.like(criteriaBuilder.lower(root.get("lastname")), pattern),
          criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), pattern));
    }).stream()
        .map(user -> modelMapper.map(user, UserReadDto.class))
        .collect(Collectors.toList());
  }

  public UserReadDto getUserByEmail(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new EntityNotFoundException("User not found with mail: " + email));
    return modelMapper.map(user, UserReadDto.class);
  }

  public List<UserReadDto> getUsersByRoleTitle(String role) {
    List<User> users = userRepository.findByRoleTitle(role);
    return users.stream()
        .map(user -> modelMapper.map(user, UserReadDto.class))
        .collect(Collectors.toList());
}


// DELETE
@Transactional
public void deleteUser(Long id) {
  User existingUser = userRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

  // Dissocier les tickets avant de supprimer l'utilisateur
  ticketService.dissociateTicketsByUser(existingUser);
  userRepository.delete(existingUser);
}


}
