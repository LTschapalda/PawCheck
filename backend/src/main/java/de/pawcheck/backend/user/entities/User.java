package de.pawcheck.backend.user.entities;

import java.util.List;


public record User(
        String id,

        List<String> catsOwned,
        List<String> catsSitting
) {
}
