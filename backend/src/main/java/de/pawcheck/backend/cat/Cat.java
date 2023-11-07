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
    private String treats;
    private String catlery;
    private String water;
    private Toilet toilet;
    private Toy toy;

    //KONSTRUKTOR
    public Cat(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
