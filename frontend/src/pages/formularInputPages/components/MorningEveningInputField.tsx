import {ChangeEvent, useState} from "react";

type MorningEveningInputFieldProps = {
    readonly onMorningInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    readonly onEveningInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    readonly buttonText: string,
    readonly valueMorning : string,
    readonly valueEvening : string,
    readonly placeholder: string,
}
export default function MorningEveningInputField(props: MorningEveningInputFieldProps) {
    //FOLD DOWN SELECTION OPERATOR
    const [isSelected, setIsSelected] = useState(false)
    const toggleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    const [morningIsSelected, setMorningIsSelected] = useState(false)
    const toggleMorningIsSelected = () => {
        setMorningIsSelected(!morningIsSelected);
    }
    const [eveningIsSelected, setEveningIsSelected] = useState(false)
    const toggleEveningIsSelected = () => {
        setEveningIsSelected(!eveningIsSelected);
    }

    return (
        <div>
            <button className="mainButton" onClick={toggleIsSelected}>{props.buttonText}</button>
            {isSelected && (
                <div>
                    {!morningIsSelected ?
                        <button className="mainButton mainButtonLighter"
                                onClick={toggleMorningIsSelected}>Morgens
                        </button>
                        :
                        <div className="secondaryButton splitInput">
                            <label onClick={toggleMorningIsSelected}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter' || e.key === 'Space') {
                                           toggleMorningIsSelected();
                                       }
                                   }}
                                   tabIndex={0}>Morgens</label>
                            <input
                                type="text"
                                placeholder={props.placeholder}
                                value={props.valueMorning}
                                onChange={props.onMorningInputChange}/>
                        </div>
                    }
                    {!eveningIsSelected ?
                        <button className="mainButton mainButtonLighter"
                                onClick={toggleEveningIsSelected}>Abends
                        </button>
                        :
                        <div className="secondaryButton splitInput">
                            <label onClick={toggleEveningIsSelected}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter' || e.key === 'Space') {
                                           toggleEveningIsSelected();
                                       }
                                   }}
                                   tabIndex={0}>Abends</label>
                            <input
                                type="text"
                                placeholder={props.placeholder}
                                value={props.valueEvening}
                                onChange={props.onEveningInputChange}/>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}