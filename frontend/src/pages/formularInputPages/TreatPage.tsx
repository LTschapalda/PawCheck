import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../images/Kategorie_Icons_food.png";
import './styling/Input.css'
import axios from "axios";
import {handleSubmit} from "../assets/FormFunctions.tsx";
import SimpleInputField from "./components/SimpleInputField.tsx";

type TreatPageProps = {
    readonly editMode: boolean;
    toggleEditMode: () => void;
    getCatsFromUser : () => void;
}
export default function TreatPage(props : TreatPageProps) {
    //VARIABLES
    const {id} = useParams();
    const [cat, setCat] = useState<Cat | undefined>(undefined);
    const navigate = useNavigate();

    const getCatById = () => {
        if (!id) {
            return undefined;
        }
        axios.get("/api/cat/" + id)
            .then((response: {
                data: Cat;
            }) => {setCat(response.data);})
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getCatById()
    }, []);

    const onTreatsInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCat((cat: Cat | undefined) => {
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

    function handleSubmitLocally() {
        if (!id) {
            console.error('ID is undefined');
            return null;
        }
        if(!cat) {
            console.error('cat is undefined');
            return null;
        }
        handleSubmit(id,cat,
            props.getCatsFromUser,
            ()=> {
                if (!props.editMode) {
                    navigate(`/home`);
                } else {
                    props.toggleEditMode();
                    navigate(`/home`);
                }
            });
    }

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
                              value={cat?.treats ?? ''}
            />

            {props.editMode ?
                <button className="secondaryButton weiter"
                        onClick={handleSubmitLocally}>weiter
                </button>
                :
                <button className="secondaryButton weiter"
                        onClick={handleSubmitLocally}>speichern
                </button>
            }



        </div>
    )
}