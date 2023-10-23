package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class CatService {
    //ATTRIBUTES
    private final CatRepo catRepo;
    private final IdService idService;

    private final UserRepo userRepo;


    //DEPENDENCY INJECTION

    public CatService(CatRepo catRepo, IdService idService, UserRepo userRepo) {
        this.catRepo = catRepo;
        this.idService = idService;
        this.userRepo = userRepo;
    }


    //METHODEN

    public Cat addCat(String name) {
        String catId = idService.generateRandomId();
        Cat newCat = new Cat(catId, name);

        User user = userRepo.findById("123").orElse(null);
        assert user != null;
        user.catsOwned().add(newCat.id());
        userRepo.save(user);

        return catRepo.save(newCat);
    }

    public Cat getCatById(String id) throws CatNotFoundException {
        try {
            return catRepo.findById(id)
                    .orElseThrow(() -> new CatNotFoundException("Cat not found with ID: " + id));
        } catch (CatNotFoundException e) {
            System.err.println("Fehler beim Abrufen der Katze: " + e.getMessage());
            return new Cat("000", "Cat not found");
        }
    }
}
