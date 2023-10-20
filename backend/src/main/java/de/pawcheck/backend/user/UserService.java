package de.pawcheck.backend.user;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.cat.CatService;
import de.pawcheck.backend.cat.Cat;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    //ATTRIBUTES
    private final UserRepo userRepo;
    private final CatService catService;
    private final IdService idService;

    //DEPENDENCY INJECTION
    public UserService(UserRepo userRepo, CatService catService, IdService idService) {
        this.userRepo = userRepo;
        this.catService = catService;
        this.idService = idService;
    }

    //METHODEN

    public User createUser(boolean isOwner) {
        String userId = idService.generateRandomId();
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
