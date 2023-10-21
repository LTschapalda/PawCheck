import  './NameInput.css'
import {ChangeEvent, useState} from "react";
import axios from "axios";

export default function NameInput() {
    const [value, setValue] = useState<string>('')

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        setValue(value);
    }

    const handleSubmit = () => {
        axios.post('cat/name', { value })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return(
        <>
            <div className="topic">
                <h1>Wie heißt deine Katze?</h1>
            </div>
            <div className="nameinput">
                <svg width="305" height="97" viewBox="0 0 305 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26 95L38 69H16.5C7 69 1 61 1 52V19C1 10.5 7.5 1.5 16.5 1.5H287C296 1.5 304 7.5 304 19V52C304 62 300.5 69 287 69H75C64.6 82.6 38 92 26 95Z" fill="white" stroke="#87AD19" stroke-width="2"/>
                    <foreignObject  x="10" y="10" width="285" height="50">
                        <input className="speech"
                               type="text"
                               placeholder="Hier eingeben"
                               value={value}
                               onChange={handleInputChange}/>
                    </foreignObject>
                </svg>
            </div>
            <div className="weiter">
                <button className="secondaryButton"
                        onClick={handleSubmit}>weiter</button>
            </div>
        </>
    );
}