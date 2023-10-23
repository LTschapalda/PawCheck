package de.pawcheck.backend.cat;

public class CatNotFoundException extends RuntimeException {
    public CatNotFoundException(String message) {
        super(message);
    }
}
