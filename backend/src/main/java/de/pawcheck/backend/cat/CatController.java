package de.pawcheck.backend.cat;

import de.pawcheck.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CatController {
    //ATTRIBUTE
    private final CatService catService;
    private final UserService userService;

    //SERVER REQUESTS
    @PostMapping("/cat")
    public Cat createCatWithName(@RequestBody RequestName requestName) {
        return catService.addCat(requestName.name);
    }

    @GetMapping("/cat/{id}")
    public Cat getCatById(@PathVariable String id) throws CatNotFoundException {
        return catService.getCatById(id);
    }

    @GetMapping("/cats/{id}")
    public List<Cat> getCatsAssociatedToUser(@PathVariable String id) {
        return userService.getCatsAssociatedToUser(id);
    }

    @DeleteMapping("/cat/{id}")
    public void deleteCatEverywhereById (@PathVariable String id) {
        catService.deleteCatEverywhereById(id);
    }

    @PutMapping("/cat/{id}")
    public Cat updateCat(@PathVariable String id, @RequestBody Cat cat) {
        return catService.updateCatById(id, cat);
    }

}