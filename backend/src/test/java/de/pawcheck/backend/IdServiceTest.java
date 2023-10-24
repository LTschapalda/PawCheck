package de.pawcheck.backend;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    IdService idService = new IdService();

    @Test
    void generateRandomId() {
        // WHEN
        String randomId = idService.generateRandomId();

        // THEN
        assertNotNull(randomId);
        assertEquals(36, randomId.length()); // UUID hat eine Länge von 36 Zeichen

        // Überprüfen, ob die ID ein gültiges UUID-Format hat
        try {
            UUID.fromString(randomId);
        } catch (IllegalArgumentException e) {
            fail("Die generierte ID ist kein gültiges UUID-Format.");
        }
    }
}