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
