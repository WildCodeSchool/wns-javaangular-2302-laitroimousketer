package wcs.backend.dataseeds;


import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;

import wcs.backend.services.AddressService;
import wcs.backend.services.RoleService;
import wcs.backend.services.UserService;
import wcs.backend.dtos.AddressDto;
import wcs.backend.dtos.RoleDto;
import wcs.backend.dtos.UserDto;


@Component
public class UserDataseed {
  @Autowired
  private UserService userService;
  @Autowired
  private RoleService roleService;
  @Autowired
  private AddressService addressService;

  public void resetData() {
    if (userService.getAllUsers().isEmpty()) {
      generateUsers(50); // Appel direct à generateUsers() s'il n'y a pas d'utilisateurs
    }
  }

  private void generateUsers(int numberOfUsers) {
    List<RoleDto> existingRoles = roleService.getAllRoles();
    List<AddressDto> existingAddresses = addressService.getAllAddresses();
    Faker faker = new Faker(new Locale("fr"));

    RoleDto roleClient = findRoleByTitle(existingRoles, "Client");
    RoleDto roleDev = findRoleByTitle(existingRoles, "Développeur");
    RoleDto roleManager = findRoleByTitle(existingRoles, "Manager");
    UserDto manager = new UserDto();
    manager.setEmail("manager@wcs.com");
    manager.setFirstname("the");
    manager.setLastname("manager");
    manager.setPassword("Alayd3!manager");
    manager.setRole(roleManager);
    userService.createUser(manager);

    UserDto dev = new UserDto();
    dev.setEmail("dev@wcs.com");
    dev.setFirstname("Dave");
    dev.setLastname("Grohl");
    dev.setPassword("Alayd3!dev");
    dev.setRole(roleDev);
    userService.createUser(dev);

    UserDto userCreated = new UserDto();
    userCreated.setLastname("jesapel");
    userCreated.setFirstname("groot");
    userCreated.setEmail("client@wcs.com");
    userCreated.setPassword("Alayd3!client");
    userCreated.setRole(roleClient);
    userService.createUser(userCreated);

    // Stocke les ID des adresses déjà attribuées.. Créez le manager, le développeur
    // et le client

    for (int i = 0; i < numberOfUsers; i++) {
      UserDto userDto = new UserDto();
      userDto.setFirstname(faker.name().firstName());
      userDto.setLastname(faker.name().lastName());
      userDto.setEmail(faker.internet().emailAddress());
      userDto.setPhone(faker.phoneNumber().cellPhone());
      userDto.setPassword(faker.internet().password());
      RoleDto randomRole = existingRoles.get(faker.random().nextInt(existingRoles.size()));
      userDto.setRole(randomRole);
      AddressDto randomAddress =
          existingAddresses.get(faker.random().nextInt(existingAddresses.size()));
      userDto.setAddress(randomAddress);
      userService.createUser(userDto);

    }
  }

  private RoleDto findRoleByTitle(List<RoleDto> roles, String title) {
    return roles.stream()
        .filter(role -> role.getRoleTitle().equalsIgnoreCase(title))
        .findFirst()
        .orElse(null);
  }
}