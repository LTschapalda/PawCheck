package de.pawcheck.backend.user;

import de.pawcheck.backend.cat.Cat;
import de.pawcheck.backend.cat.CatService;
import org.springframework.stereotype.Service;

import java.util.List;
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
        User user = userRepo.findById(id).orElse(null);
        assert user != null;
        List<String> idsCatsOwned = user.catsOwned();

        return idsCatsOwned.stream()
                .map(catService::getCatById) // Ruft die findById-Methode für jede ID auf
                .filter(cat -> cat != null) // Filtert null-Werte, falls findById keine Übereinstimmung findet
                .collect(Collectors.toList());
    }

}
