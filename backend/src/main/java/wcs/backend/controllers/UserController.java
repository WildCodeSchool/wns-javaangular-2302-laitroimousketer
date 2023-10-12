package wcs.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
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
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);  // HttpStatus.CREATED (201)
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get User by ID", description = "Get user details by user ID")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @GetMapping
    @Operation(summary = "Get All Users", description = "Get details of all users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);  // HttpStatus.OK (200)
    }

    @PutMapping("/{userId}")
    @Operation(summary = "Update User", description = "Update user details by user ID")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        user.setId(userId);
        User updatedUser = userService.updateUser(user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Delete User", description = "Delete user by user ID")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();  // HttpStatus.NO_CONTENT (204)
    }

    @GetMapping("/search")
    @Operation(summary = "Search Users by Name", description = "Search users by name")
    public ResponseEntity<List<User>> getUsersByName(@RequestParam String name) {
        List<User> users = userService.getUsersByName(name);
        return ResponseEntity.ok(users);  // HttpStatus.OK (200)
    }

    @GetMapping("/email")
    @Operation(summary = "Get User by Email", description = "Get user details by email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
      Optional<User> user = userService.getUserByEmail(email);
      if (user.isPresent()) {
        return ResponseEntity.ok(user.get());
      } else {
        return ResponseEntity.notFound().build();
      }
    }
    
}
