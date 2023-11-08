package de.pawcheck.backend.user;

import java.util.List;

public record User(
        String id,

        String name,
        String email,
        List<String> catsOwned
) {
}
