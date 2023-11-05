import axios from "axios";
import {Cat} from "./Cat.ts";

export const handleSubmit = (id: string, cat: Cat, getCatsFromUser : () => void) => {
    axios.put("/api/cat/" + id, cat)
        .then((response: {
            data: Cat;
        }) => {
            console.log(cat)
            console.log('Erfolgreich upgedatet:' + JSON.stringify(response.data));
            getCatsFromUser();
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getCatById = async (id: string | undefined): Promise<Cat | undefined> => {
    if (!id) {
        return undefined;
    }

    try {
        const response = await axios.get("/api/cat/" + id);
        return response.data;
    } catch (reason) {
        console.error(reason);
        return undefined;
    }
}