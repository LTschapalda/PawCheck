package de.pawcheck.backend.user;

import java.util.List;

public record User(
        String id,
        List<String> catsOwned
) {
}
