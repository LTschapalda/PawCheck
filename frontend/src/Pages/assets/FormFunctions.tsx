import axios from "axios";
import {Cat} from "./Cat.ts";

export const handleSubmit = (id: string, cat: Cat, getCatsFromUser : () => void, whatToDoAfter : () => void) => {
    axios.put("/api/cat/" + id, cat)
        .then((response: {
            data: Cat;
        }) => {
            console.log(cat)
            console.log('Erfolgreich upgedatet:' + JSON.stringify(response.data));
            getCatsFromUser();
            whatToDoAfter();
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getCatById = async (id: string | undefined): Promise<Cat | undefined> => {
    if (!id) {
        return undefined;
    }
        axios.get("/api/cat/" + id)
            .then((response: {
                data: Cat;
            }) => {return response.data;})
            .catch((error) => {
                console.error(error);
            });
}