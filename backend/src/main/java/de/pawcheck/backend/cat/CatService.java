package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import org.springframework.stereotype.Service;
@Service
public class CatService {
    //ATTRIBUTES
    private final CatRepo catRepo;
    private final IdService idService;

    //DEPENDENCY INJECTION
    public CatService(CatRepo catRepo, IdService idService) {
        this.catRepo = catRepo;
        this.idService = idService;
    }

    //METHODEN

    public Cat addCat(String name) {
        String catId = idService.generateRandomId();
        Cat newCat = new Cat(catId, name);
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
