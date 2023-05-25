package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import wcs.backend.entities.User;
import wcs.backend.entities.Role;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.repositories.UserRepository;


@Service
@AllArgsConstructor
public class UserService {

  private UserRepository userRepository;
  private RoleRepository roleRepository;

  public User createUser(User user) {
    Role clientRole = roleRepository.findByTitle(Role.Title.CLIENT);

    if (clientRole == null) {
        clientRole = new Role(Role.Title.CLIENT);
        roleRepository.save(clientRole);
    }

    user.setRole(clientRole);
    clientRole.getUsers().add(user);

    return userRepository.save(user);
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
