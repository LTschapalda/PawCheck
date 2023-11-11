import {ChangeEvent, useState} from "react";
import AutoResizingTextarea from "./AutoResizingTextarea.tsx";

type SimpleInputFieldProps = {
    readonly onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    readonly buttonText: string,
    readonly placeholder: string,
    readonly value: string,
}

export default function SimpleInputField(props: SimpleInputFieldProps) {
    //FOLD DOWN SELECTION OPERATOR
    const [isSelected, setIsSelected] = useState(false)
    const toggleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    return (
        <div>
            <button className="mainButton"
                    onClick={toggleIsSelected}>{props.buttonText}
            </button>
            {isSelected && (
                <div className="smallerInput">
                    <AutoResizingTextarea value={props.value}
                                          placeholder={props.placeholder}
                                          onChange={props.onInputChange}/>
                </div>

            )}
        </div>
    )
}