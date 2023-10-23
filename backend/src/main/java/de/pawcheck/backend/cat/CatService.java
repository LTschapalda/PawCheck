package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

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
        Optional<Cat> catOptional = catRepo.findById(id);

        // Überprüfen, ob das Objekt vorhanden ist
        if (catOptional.isPresent()) {
            return catOptional.get(); // Das tatsächliche Objekt aus dem Optional abrufen
        } else {
           throw new CatNotFoundException("Cat not found with ID: " + id);
        }
    }
}
