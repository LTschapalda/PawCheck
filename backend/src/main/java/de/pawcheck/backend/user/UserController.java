package de.pawcheck.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    //ATTRIBUTE
    private final UserService userService;

    //DEPENDENCY INJECTION
    @Autowired
    public UserController (UserService userService) {
        this.userService = userService;
    }

    //SERVER REQUESTS
    @PostMapping("/newuser")
    public User createUser(@RequestBody boolean isOwner) {
        return userService.createUser(isOwner);
    }
}
