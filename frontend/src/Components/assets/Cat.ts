import {Food} from "./FoodTypes.ts";

export type Cat ={
    id : string,
    name : string,
    dry? : Food,
    wet? : Food,
}