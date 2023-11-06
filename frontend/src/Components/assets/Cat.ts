export type Cat = {
    id : string,
    name : string,
    dry? : Food,
    wet? : Food,
    treats? : string,
    catlery? : string,
    toilet? : Toilet,
    toy? : Toy,

}

export type Food = {
    morning? : string,
    evening? : string,
}

export type Toilet = {
    where? : string,
    howOften? : string,
    whereTheShit? : string,
}

export type Toy = {
    what? : string,
    where? : string,
}