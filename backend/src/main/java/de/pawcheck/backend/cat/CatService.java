package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CatService {
    //ATTRIBUTES
    private final CatRepo catRepo;
    private final IdService idService;

    private final UserRepo userRepo;

    private final MongoTemplate mongoTemplate;


    //DEPENDENCY INJECTION

    public CatService(CatRepo catRepo, IdService idService, UserRepo userRepo, MongoTemplate mongoTemplate) {
        this.catRepo = catRepo;
        this.idService = idService;
        this.userRepo = userRepo;
        this.mongoTemplate = mongoTemplate;
    }


    //METHODEN

    public Cat addCat(RequestName requestName) {
        String catId = idService.generateRandomId();
        Cat newCat = new Cat(catId, requestName.catName);

        Optional<User> optionalUser = userRepo.findById(requestName.userId);

        if (optionalUser.isPresent()) {
            User user =optionalUser.get();
            List<String> updatedCatIds = new ArrayList<>(user.catsOwned());
            updatedCatIds.add(newCat.getId());

            User upatedUser = new User(user.id(), user.name(), user.email(), updatedCatIds);
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

    public void deleteCatEverywhereById(String catId) {
        Query query = new Query(Criteria.where("catsOwned").in(catId));
        Update update = new Update().pull("catsOwned", catId);
        mongoTemplate.updateMulti(query, update, User.class);

        catRepo.deleteById(catId);
    }

    public Cat updateCatById(String id, Cat cat) {
        Optional<Cat> existingCatOptional = catRepo.findById(id);

        if (existingCatOptional.isPresent()) {
            Cat existingCat = existingCatOptional.get();
            existingCat.setName(cat.getName());
            existingCat.setWet(cat.getWet());
            existingCat.setDry(cat.getDry());
            existingCat.setTreats(cat.getTreats());
            existingCat.setCatlery(cat.getCatlery());
            existingCat.setWater(cat.getWater());
            existingCat.setToilet(cat.getToilet());
            existingCat.setToy(cat.getToy());

            return catRepo.save(existingCat);
        } else {
            return null;
        }
    }

}
