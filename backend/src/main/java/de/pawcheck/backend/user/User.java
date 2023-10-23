package de.pawcheck.backend.user;

import lombok.Data;

import java.util.List;

@Data
public class User {
    private String id = "123";
    private List<String> catsOwned;

    //KONSTRUKTOR
    public User(List<String> catsOwned) {
        this.id = "123";
        this.catsOwned = catsOwned;
    }
}
