package de.pawcheck.backend.cat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestName {
    String catName;
    String userId;
}
