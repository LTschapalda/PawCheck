package de.pawcheck.backend;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public record IdService() {
    public String generateRandomId() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
