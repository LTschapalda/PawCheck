package de.pawcheck.backend.cat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cat {
    private String id;
    private String name;
    private Food wet;
    private Food dry;

    //KONSTRUKTOR
    public Cat(String id, String name) {
        this.id = id;
        this.name = name;
        this.wet = null;
        this.dry = null;
    }
}
