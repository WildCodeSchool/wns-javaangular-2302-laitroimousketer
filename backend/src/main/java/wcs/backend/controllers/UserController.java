package wcs.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import wcs.backend.entities.User;
import wcs.backend.services.UserService;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);  // HttpStatus.CREATED (201)
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);  // HttpStatus.OK (200)
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        user.setId(userId);
        User updatedUser = userService.updateUser(user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);  // HttpStatus.OK (200)
        }
        return ResponseEntity.notFound().build();  // HttpStatus.NOT_FOUND (404)
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();  // HttpStatus.NO_CONTENT (204)
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> getUsersByName(@RequestParam("name") String name) {
        List<User> users = userService.getUsersByName(name);
        return ResponseEntity.ok(users);  // HttpStatus.OK (200)
    }
}
