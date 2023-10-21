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

}
