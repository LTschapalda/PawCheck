package de.pawcheck.backend.user;

import de.pawcheck.backend.cat.Cat;
import de.pawcheck.backend.cat.CatService;
import org.springframework.stereotype.Service;

import java.util.List;
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

}
