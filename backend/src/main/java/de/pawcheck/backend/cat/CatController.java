package de.pawcheck.backend.cat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CatController {
    //ATTRIBUTE
    private final CatService catService;

    //DEPENDENCY INJECTION
    @Autowired
    public CatController (CatService catService) {
        this.catService = catService;
    }

    //SERVER REQUESTS
    @PostMapping("/cat")
    public Cat createCatWithName(@RequestBody RequestName requestName) {
        return catService.addCat(requestName.name);
    }

}