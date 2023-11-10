import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect} from "react";
import {Cat} from "../assets/Cat.ts";
import LitterboxIcon from "../../images/Kategorie_Icons_litterbox.png"
import './styling/Input.css'
import SimpleInputField from "./components/SimpleInputField.tsx";

type ToiletPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat? : Cat;
    readonly setCat :  React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById : (id: string) => undefined;
    readonly getCatsFromUser : () => void;
    readonly updateCat : (id: string | undefined, cat: Cat | undefined, getCatsFromUser: () => void) => Promise<void>;
}
export default function ToiletPage(props : ToiletPageProps) {
    //VARIABLES
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            props.getCatById(id)
        }
    }, []);
    const onWhereInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    toilet: {where: event.target.value},
                    id: '',
                    name: '',
                };
            } else {
                return { ...cat, toilet: {...cat.toilet, where: event.target.value}};
            }
        });
    };

    const onHowOftenInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    toilet: {howOften: event.target.value},
                    id: '',
                    name: '',
                };
            } else {
                return { ...cat, toilet: {...cat.toilet, howOften: event.target.value}};
            }
        });
    };

    const onWhereTheShitInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCat((cat: Cat | undefined) => {
            if (!cat) {
                return {
                    toilet: {whereTheShit: event.target.value},
                    id: '',
                    name: '',
                };
            } else {
                return { ...cat, toilet: {...cat.toilet, whereTheShit: event.target.value}};
            }
        });
    };

    return (
        <div className="container">

            <div className="topicImage">
                <img src={LitterboxIcon} alt="litterbox icon"/>
            </div>

            <div className="topicText">
                <h1>Wie siehts mit dem Klo aus? </h1>
            </div>

            <SimpleInputField onInputChange={onWhereInput}
                              buttonText="Wo?"
                              placeholder="Beschreibe wo das Katzenklo steht"
                              value={props.cat?.toilet?.where ?? ''}
            />
            <SimpleInputField onInputChange={onHowOftenInput}
                              buttonText="Wie oft?"
                              placeholder="Soll die Toilette bei jedem Besuch gereinigt werden?"
                              value={props.cat?.toilet?.howOften ?? ''}
            />
            <SimpleInputField onInputChange={onWhereTheShitInput}
                              buttonText="Wohin mit dem Sch**ß?"
                              placeholder="Gibt es eine extra Mülltonne? oder direkt in die Toilette?"
                              value={props.cat?.toilet?.whereTheShit ?? ''}
            />

            {props.editMode ?
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id,props.cat,props.getCatsFromUser)
                                .then(() => {navigate(`/cat/details/${props.cat?.id}`)})
                        }}
                >speichern</button>
                :
                <button className="secondaryButton weiter"
                        onClick={() => {
                            props.updateCat(id,props.cat,props.getCatsFromUser)
                                .then(() => {navigate(`/home`)})
                        }}
                >weiter</button>
            }



        </div>
    )
}