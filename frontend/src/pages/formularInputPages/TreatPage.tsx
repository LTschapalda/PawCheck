import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../images/Kategorie_Icons_food.png";
import SimpleInputField from "./components/SimpleInputField.tsx";
import PawCheck from "../../images/PawCheck.svg";

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
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);
    const onTreatsInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    treats: event.target.value,
                    id: '',
                    name: '',
                };
            } else {
                return {...cat, treats: event.target.value};
            }
        });
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


            {props.editMode ?
                <button className="mainButton save"
                        onClick={() => {
                            props.updateCat(id, props.cat, props.getCatsFromUser)
                                .then(() => {
                                    navigate(`/cat/details/${props.cat?.id}`)
                                })
                        }}>
                    <img className="thumbsUp" src={PawCheck} alt="PawCheck"/>
                    <span className="text">speichern</span>
                </button>
                :
                <button className="mainButton save"
                        onClick={() => {
                            props.updateCat(id, props.cat, props.getCatsFromUser)
                                .then(() => {
                                    navigate(`/cat/water/${id}`)
                                })
                        }}>
                    <img className="thumbsUp" src={PawCheck} alt="PawCheck"/>
                    <span className="text">weiter</span>
                </button>
            }
        </div>
    )
}