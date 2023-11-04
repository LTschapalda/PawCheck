import axios from "axios";
import {Cat} from "./Cat.ts";

export const handleSubmit = (id: string, cat: Cat) => {
    axios.put("/api/cat/" + id, cat)
        .then((response: {
            data: string;
        }) => {
            console.log('Erfolgreich upgedatet:' + response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}