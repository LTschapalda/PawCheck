import {Cat} from "./Cat.ts";

export type CatUpdater = (cat: Cat | undefined, valueKey: keyof Cat, value: string) => Cat;

export const updateSimpleCatValue: CatUpdater = (cat, valueKey, value) => {
    if (!cat) {
        const updatedCat: Cat = {
            [valueKey]: value,
            id: '',
            name: '',
        };
        return updatedCat;
    } else {
        const updatedCat: Cat = { ...cat, [valueKey]: value };
        return updatedCat;
    }
};
