import {useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../images/Kategorie_Icons_food.png";
import SimpleInputField from "./components/SimpleInputField.tsx";
import {updateSimpleCatValue} from "../assets/formInputFunktions.ts";
import ContinueOrSaveButton from "./components/ContinueOrSaveButton.tsx";

type TreatPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat?: Cat;
    readonly setCat: React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById: (id: string) => undefined;
    readonly getCatsFromUser: () => void;
    readonly updateCat: (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
}
export default function TreatPage(props: TreatPageProps) {
    //VARIABLES
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);

    const onTreatsInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const updatedCat = updateSimpleCatValue(props.cat, 'treats', event.target.value);
        props.setCat(updatedCat);
    };

    return (
        <div className="container">
            <div className="scrollbar">
                <div className="inputTopic">
                    <img src={FoodIcon} alt="food icon"/>
                    <h2>Wie siehts mit Leckerchen aus? </h2>
                </div>

                <SimpleInputField onInputChange={onTreatsInput}
                                  buttonText="Jup"
                                  placeholder="Wie viele?"
                                  value={props.cat?.treats ?? ''}
                />
            </div>

            <ContinueOrSaveButton editMode={props.editMode}
                                  updateCat={props.updateCat}
                                  id={id}
                                  cat={props.cat}
                                  getCatsFromUser={props.getCatsFromUser}
                                  route={`/cat/water/${id}`}/>
        </div>
    )
}