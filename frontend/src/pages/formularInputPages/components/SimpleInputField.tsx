import {ChangeEvent, useState} from "react";

type SimpleInputFieldProps = {
    readonly onInputChange : (event: ChangeEvent<HTMLInputElement>) => void,
    readonly buttonText : string,
    readonly placeholder : string,
    readonly value : string,
}

export default function SimpleInputField(props : SimpleInputFieldProps) {
    //FOLD DOWN SELECTION OPERATOR
    const [isSelected, setIsSelected] = useState(false)
    const toggleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    return (
        <div className="dropdown catDetails">
            <button className="mainButton"
                    onClick={toggleIsSelected}>{props.buttonText}
            </button>
            {isSelected && (
                <div className="secondaryButton">
                    <input type="text"
                           placeholder={props.placeholder}
                           value={props.value}
                           onChange={props.onInputChange}/>
                </div>
            )}
        </div>
    )
}