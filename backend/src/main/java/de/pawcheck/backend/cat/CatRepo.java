package de.pawcheck.backend.cat;

import de.pawcheck.backend.cat.entities.Cat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatRepo extends MongoRepository<Cat, String> {
}
