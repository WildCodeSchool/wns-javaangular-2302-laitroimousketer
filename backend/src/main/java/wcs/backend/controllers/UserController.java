package wcs.backend.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.UserDto;
import wcs.backend.dtos.UserReadDto;
import wcs.backend.services.UserService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/users/")
@Tag(name = "Users", description = "Users Controller")
public class UserController {
  @Autowired
  private UserService userService;
  @Autowired
  private ModelMapper modelMapper;

  @GetMapping
  @Operation(summary = "Get Users", description = "Get users by query, email, or all users")
  public ResponseEntity<?> getUsers(
      @RequestParam(required = false) String query,
      @RequestParam(required = false) String email) {

    if (query != null) {
      List<UserReadDto> userReadDtos = userService.getUsersByQuery(query);
      return ResponseEntity.ok(userReadDtos);
    } else if (email != null) {
      UserReadDto userReadDto = userService.getUserByEmail(email);
      if (userReadDto != null) {
        return ResponseEntity.ok(userReadDto);
      } else {
        return ResponseEntity.notFound().build();
      }
    } else {
      List<UserReadDto> userReadDtos = userService.getAllUsers();
      return ResponseEntity.ok(userReadDtos);
    }
  }

  @GetMapping("{id}")
  @Operation(summary = "Get User by ID", description = "Get user details by user ID")
  public ResponseEntity<UserReadDto> getUserById(@PathVariable Long id) {
    UserReadDto userDto = userService.getUserById(id);
    return ResponseEntity.ok(userDto);
  }

  @PostMapping
  @Operation(summary = "Create User", description = "Create a new user")
  public ResponseEntity<UserReadDto> createUser(@RequestBody UserDto userDto) {
    UserDto createdUserDto = userService.createUser(userDto);
    // on renvoie la réponse sous forme de UserReadDto pour ne pas retourner le mot
    // de passe
    UserReadDto userReadDto = modelMapper.map(createdUserDto, UserReadDto.class);
    return ResponseEntity.ok(userReadDto);
  }

  @PutMapping("{id}")
  @Operation(summary = "Update User", description = "Update user details by user ID")
  public ResponseEntity<UserReadDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
    UserDto updatedUserDto = userService.updateUser(id, userDto);
    // on renvoie la réponse sous forme de UserReadDto pour ne pas retourner le mot
    // de passe
    UserReadDto updatedUserReadDto = modelMapper.map(updatedUserDto, UserReadDto.class);
    return ResponseEntity.ok(updatedUserReadDto);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Delete User", description = "Delete user by user ID")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }

}
