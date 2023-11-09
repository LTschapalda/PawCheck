import {Cat} from "./Cat.ts";

export type User = {
    id : string,
    name : string,
    email : string,
    catsOwned : Cat[],
}