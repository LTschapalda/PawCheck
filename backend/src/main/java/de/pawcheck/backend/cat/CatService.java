package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        Optional<User> optionalUser = userRepo.findById("123");

        if (optionalUser.isPresent()) {
            User user =optionalUser.get();
            List<String> updatedCatIds = new ArrayList<>(user.catsOwned());
            updatedCatIds.add(newCat.id());

            User upatedUser = new User(user.id(),updatedCatIds);
            userRepo.save(upatedUser);
        } else {
            System.out.println("The User is null");
        }

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
