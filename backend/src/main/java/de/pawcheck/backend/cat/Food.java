package de.pawcheck.backend.cat;

public record Food(
        Solidity solidity,
        TimeOfDay timeOfDay,
        int amount
) {
}
