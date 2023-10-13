package wcs.backend.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.UserDto;
import wcs.backend.entities.User;
import wcs.backend.services.UserService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/users")
@Tag(name = "Users", description = "Users Controller")
public class UserController {

    private UserService userService;

    @PostMapping
    @Operation(summary = "Create User", description = "Create a new user")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        User user = mapDtoToEntity(userDto);
        User createdUser = userService.createUser(user);
        UserDto createdUserDto = mapEntityToDto(createdUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);  // HttpStatus.CREATED (201)
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get User by ID", description = "Get user details by user ID")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            UserDto userDto = mapEntityToDto(user);
            return ResponseEntity.ok(userDto);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @GetMapping
    @Operation(summary = "Get All Users", description = "Get details of all users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDto> userDtos = users.stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);  // HttpStatus.OK (200)
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update User", description = "Update user details by user ID")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) {
        User user = mapDtoToEntity(userDto);
        user.setId(userId);
        User updatedUser = userService.updateUser(user);
        if (updatedUser != null) {
            UserDto updatedUserDto = mapEntityToDto(updatedUser);
            return ResponseEntity.ok(updatedUserDto);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Delete User", description = "Delete user by user ID")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.noContent().build();  // HttpStatus.NO_CONTENT (204)
    }

    @GetMapping("/search")
    @Operation(summary = "Search Users by Name", description = "Search users by name")
    public ResponseEntity<List<UserDto>> getUsersByName(@RequestParam String name) {
        List<User> users = userService.getUsersByName(name);
        List<UserDto> userDtos = users.stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);  // HttpStatus.OK (200)
    }

    @GetMapping("/email")
    @Operation(summary = "Get User by Email", description = "Get user details by email")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent()) {
            UserDto userDto = mapEntityToDto(user.get());
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private UserDto mapEntityToDto(User user) {
        return new UserDto(user);
    }

    private User mapDtoToEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        // Map other fields as needed
        return user;
    }
}
