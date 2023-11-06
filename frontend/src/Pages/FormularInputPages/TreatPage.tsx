import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import {handleSubmit} from "../assets/FormFunctions.tsx";
import './Input.css'
import axios from "axios";

type TreatPageProps = {
    editMode: boolean;
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

    //FOLD DOWN SELECTION OPERATOR
    const [treats, setTreats] = useState(false)
    const toggleTreats = () => {
        setTreats(!treats);
    }

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
            ()=> {navigate(`/home`);});
    }

    return (
        <div className="container">

            <div className="topicImage">
                <img src={FoodIcon} alt="food icon"/>
            </div>

            <div className="topicText">
                <h1>Wie siehts mit Leckerchen aus? </h1>
            </div>

            <div className="dropdown catDetails">
                <button className="mainButton"
                        onClick={toggleTreats}>Jup
                </button>
                {treats && (
                    <div className="secondaryButton">
                        <input type="text"
                               placeholder="Wie viel?"
                               value={cat?.treats || ''}
                               onChange={onTreatsInput}/>
                    </div>
                )}
            </div>
            <button className="secondaryButton weiter"
                    onClick={handleSubmitLocally}>weiter
            </button>


        </div>
    )
}