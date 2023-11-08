package de.pawcheck.backend.user;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {


    UserService userService;

    //Konstruktor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof OAuth2AuthenticationToken token) {
            return userService.showUser(token);
        }
        return null;
    }

   /* @GetMapping
    public String getUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof OAuth2AuthenticationToken token) {
            Map<String, Object> attributes = token.getPrincipal().getAttributes();
            System.out.println(attributes);
        }

        return auth.getName();
    }*/

}

