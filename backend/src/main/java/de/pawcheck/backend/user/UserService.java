package de.pawcheck.backend.user;

import de.pawcheck.backend.cat.CatService;
import de.pawcheck.backend.cat.entities.Cat;
import de.pawcheck.backend.user.entities.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    //ATTRIBUTES
    private final UserRepo userRepo;
    private final CatService catService;

    //DEPENDENCY INJECTION
    public UserService(UserRepo userRepo, CatService catService) {
        this.userRepo = userRepo;
        this.catService = catService;
    }

    //METHODEN
    public static String generateRandomId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public User createUser(boolean isOwner) {
        String userId = generateRandomId();
        Cat newCat = catService.addCat();

        List<String> catsOwned = new ArrayList<>();
        List<String> catsSitting = new ArrayList<>();

        if (isOwner) {
            catsOwned.add(newCat.id());
        } else {
            catsSitting.add(newCat.id());
        }

        User newUser = new User(userId, catsOwned, catsSitting);
        return userRepo.save(newUser);
    }
}
