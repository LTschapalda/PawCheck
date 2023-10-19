package de.pawcheck.backend.cat;

import de.pawcheck.backend.cat.entities.Cat;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CatService {
    //ATTRIBUTES
    private final CatRepo catRepo;

    //DEPENDENCY INJECTION
    public CatService(CatRepo catRepo) {
        this.catRepo = catRepo;
    }

    //METHODEN
    public static String generateRandomId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public Cat addCat() {
        String catId = generateRandomId();
        Cat newCat = new Cat(catId);
        return catRepo.save(newCat);
    }

}
