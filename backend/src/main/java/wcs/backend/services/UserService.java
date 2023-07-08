package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import wcs.backend.entities.User;
import wcs.backend.entities.Role;
import wcs.backend.entities.Role.Title;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@AllArgsConstructor
public class UserService {

  private UserRepository userRepository;
  private RoleRepository roleRepository;
  private PasswordEncoder passwordEncoder;

  public User createUser(User user) {
    String encryptedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encryptedPassword);

    // Définir le rôle par défaut (CLIENT)
    Role defaultRole = roleRepository.findByTitle(Title.CLIENT).get(0);
    if (defaultRole == null) {
      user.setRole(defaultRole);
    }
    User savedUser = userRepository.save(user);
    return savedUser;
  }

  public User getUserById(Long userId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    return optionalUser.orElse(null);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User updateUserMail(User user) {
    Optional<User> optionalExistingUser = userRepository.findById(user.getId());
    if (optionalExistingUser.isPresent()) {
      User existingUser = optionalExistingUser.get();
      existingUser.setEmail(user.getEmail());
      return userRepository.save(existingUser);
    }
    return null;
  }

  public User updateUser(User user) {
    User existingUser = userRepository.findById(user.getId()).orElse(null);

    if (existingUser != null) {
      existingUser.setEmail(user.getEmail());
      existingUser.setFirstname(user.getFirstname());
      existingUser.setLastname(user.getLastname());
      existingUser.setRole(user.getRole());

      String encryptedPassword = passwordEncoder.encode(user.getPassword());
      existingUser.setPassword(encryptedPassword);

      User updatedUser = userRepository.save(existingUser);
      return updatedUser;
    }
    return null;
  }

  public void deleteUser(Long userId) {
    userRepository.deleteById(userId);
  }

  public List<User> getUsersByName(String name) {
    return userRepository.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(name, name);
  }

  public User updateUserRole(Long userId, Long roleId) {
    User user = userRepository.findById(userId).orElse(null);
    Role role = roleRepository.findById(roleId).orElse(null);

    if (user != null && role != null) {
      user.setRole(role);
      return userRepository.save(user);
    }
    return null;
  }

}
