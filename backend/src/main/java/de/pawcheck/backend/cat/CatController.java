package de.pawcheck.backend.cat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Cat createCatWithName(@RequestBody String name) {
        return catService.addCat(name);
    }
}