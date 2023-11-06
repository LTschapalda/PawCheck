import {ChangeEvent, useState} from "react";
import {Cat} from "../../assets/Cat.ts";

type SimpleInputFieldProps = {
    cat? : Cat,
    setCat :  React.Dispatch<React.SetStateAction<Cat | undefined>>,
    onInputChange : (event: ChangeEvent<HTMLInputElement>) => void,
    buttonText : string,
    placeholder : string,
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
                           value={props.cat?.treats || ''}
                           onChange={props.onInputChange}/>
                </div>
            )}
        </div>
    )
}