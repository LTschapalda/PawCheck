import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../images/Kategorie_Icons_food.png";
import './styling/Input.css'
import SimpleInputField from "./components/SimpleInputField.tsx";

type TreatPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat? : Cat;
    readonly setCat :  React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById : (id: string) => undefined;
    readonly getCatsFromUser : () => void;
    readonly updateCat : (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
}
export default function TreatPage(props : TreatPageProps) {
    //VARIABLES
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);
    const onTreatsInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    treats: event.target.value,
                    id: '',
                    name: '',
                };
            } else {
                return { ...cat, treats: event.target.value };
            }
        });
    };

    return (
        <div className="container">

            <div className="topicImage">
                <img src={FoodIcon} alt="food icon"/>
            </div>

            <div className="topicText">
                <h1>Wie siehts mit Leckerchen aus? </h1>
            </div>

            <SimpleInputField onInputChange={onTreatsInput}
                              buttonText="Jup"
                              placeholder="Wie viele?"
                              value={props.cat?.treats ?? ''}
            />

            {props.editMode ?
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id,props.cat,props.getCatsFromUser)
                                .then(() => {navigate(`/home`)})
                        }}
                >speichern</button>
                :
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id,props.cat,props.getCatsFromUser)
                                .then(() => {navigate(`/cat/water/${id}`)})
                        }}
                >weiter</button>
            }



        </div>
    )
}