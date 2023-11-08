package de.pawcheck.backend.user;

import de.pawcheck.backend.cat.Cat;
import de.pawcheck.backend.cat.CatService;
import org.springframework.stereotype.Service;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final CatService catService;


    //KONSTRUKTOR
    public UserService(UserRepo userRepo, CatService catService) {
        this.userRepo = userRepo;
        this.catService = catService;
    }

    public List<Cat> getCatsAssociatedToUser(String id) {
        Optional<User> optionalUser = userRepo.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> idsCatsOwned = user.catsOwned();
            return idsCatsOwned.stream()
                    .map(catService::getCatById)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } else {
            return List.of();
        }
        
        
    }

    public User showUser(OAuth2AuthenticationToken token) {
        Map<String, Object> attributes = token.getPrincipal().getAttributes();

        String id = attributes.getOrDefault("sub", "").toString();
        String userName = attributes.getOrDefault("given_name", "").toString();
        String email = attributes.getOrDefault("email", "").toString();
        User newUser = new User(id,userName,email,List.of());
        System.out.println(newUser);
        return newUser;
    }

    public User handleLogin(OAuth2AuthenticationToken token) {

        Map<String, Object> attributes = token.getPrincipal().getAttributes();

        String id = attributes.getOrDefault("sub", "").toString();

        if (userRepo.findById(id).isPresent()) {
            return userRepo.findById(id).orElseThrow();
        } else  {
            String userName = attributes.getOrDefault("given_name", "").toString();
            String email = attributes.getOrDefault("email", "").toString();
            User newUser = new User(id,userName,email,List.of());
            System.out.println(newUser);
            return userRepo.save(newUser);
        }
    }
}
