package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.entities.User;
import wcs.backend.entities.UserAddress;
import wcs.backend.entities.TicketHaveUsers;
import wcs.backend.dtos.AddressDto;
import wcs.backend.entities.Address;
import wcs.backend.entities.Role;
import wcs.backend.entities.Role.Title;
import wcs.backend.repositories.AddressRepository;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.repositories.TicketHaveUsersRepository;
import wcs.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@AllArgsConstructor
public class UserService {

  private UserRepository userRepository;
  private RoleRepository roleRepository;
  private PasswordEncoder passwordEncoder;
  private TicketHaveUsersRepository ticketHaveUsersRepository;
  private AddressRepository addressRepository;
  private AddressService addressService;

  // Creation user with adress
  // public User createUser(User user, AddressDto addressDto) {
  // String encryptedPassword = passwordEncoder.encode(user.getPassword());
  // user.setPassword(encryptedPassword);

  // Role defaultRole = roleRepository.findByRoleTitle(Title.CLIENT).get(0);
  // if (defaultRole != null) {
  // user.setRole(defaultRole);
  // }
  // User savedUser = userRepository.save(user);
  // // Créer et associer une adresse à l'utilisateur
  // Address address = createAddressFromDto(addressDto);
  // UserAddress userAddress = new UserAddress();
  // address.getUserAddresses().add(userAddress);
  // addressRepository.save(address);
  // return savedUser;
  // }
  public User createUser(User user) {
    String encryptedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(encryptedPassword);

    // Définir le rôle par défaut (CLIENT)
    Role defaultRole = roleRepository.findByRoleTitle(Title.CLIENT).get(0);
    if (defaultRole == null) {
      user.setRole(defaultRole);
    }
    User savedUser = userRepository.save(user);
    return savedUser;
  }

  // creation adresse user
  private Address createAddressFromDto(AddressDto addressDto) {
    // Convertir les données de DTO en entité Address
    Address address = new Address();
    // ... autres champs
    return address;
  }

  // get user by id
  public User getUserById(Long userId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    return optionalUser.orElse(null);
  }

  // get all users
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // public User updateUserMail(User user) {
  // Optional<User> optionalExistingUser = userRepository.findById(user.getId());
  // if (optionalExistingUser.isPresent()) {
  // User existingUser = optionalExistingUser.get();
  // existingUser.setEmail(user.getEmail());
  // return userRepository.save(existingUser);
  // }
  // return null;
  // }

  public User updateUserAddress(Long userId, AddressDto updatedAddressDto) {
    User user = userRepository.findById(userId).orElse(null);
    if (user != null) {
      // Obtenez l'adresse actuelle de l'utilisateur
      Address currentAddress = user.getAddress();
      // Mettez à jour les détails de l'adresse avec ceux du DTO
      currentAddress.setCity(updatedAddressDto.getCity());
      currentAddress.setCountry(updatedAddressDto.getCountry());
      currentAddress.setLatitude(updatedAddressDto.getLatitude());
      currentAddress.setLongitude(updatedAddressDto.getLongitude());
      currentAddress.setPostcode(updatedAddressDto.getPostcode());
      currentAddress.setStreet_l1(updatedAddressDto.getStreet_l1());
      currentAddress.setStreet_l2(updatedAddressDto.getStreet_l2());
      // Sauvegardez l'adresse mise à jour
      addressService.updateAddress(currentAddress);
      return user;
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

  public void deleteUserById(Long userId) {
    // Ensuite, supprimez l'utilisateur
    userRepository.deleteById(userId);
  }

  public List<User> getUsersByName(String name) {
    return userRepository.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(name, name);
  }

  public List<User> getUsersByRole(Role role) {
    return userRepository.findByRole(role);
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

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User getFirstUserByName(String name) {
    List<User> users = userRepository.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(name, name);
    if (!users.isEmpty()) {
      return users.get(0); // Retournez le premier utilisateur correspondant trouvé
    }
    return null; // Aucun utilisateur trouvé
  }

}
