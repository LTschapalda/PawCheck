import {Link, useParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import {handleSubmit} from "../assets/submitFunction.tsx";

type TreatPageProps = {
    catsOwned: Cat[];
    editMode: boolean;
    toggleEditMode: () => void;
}
export default function TreatPage(props : TreatPageProps) {
    //VARIABLES
    const {id} = useParams();
    const [cat, setCat] = useState(props.catsOwned.find((cat: Cat) => cat.id === id));

    //FOLD DOWN SELECTION OPERATOR
    const [treats, setTreats] = useState(false)
    const toggleTreats = () => {
        setTreats(!treats);
    }

    const onTreatsInput = (event: ChangeEvent<HTMLInputElement>) => {
        setCat((prevCat: Cat | undefined) => {
            if (!prevCat) {
                return {
                    treats: event.target.value,
                    id: '',
                    name: '',
                };
            } else {
                return { ...prevCat, treats: event.target.value };
            }
        });
    };

    if (!id) {
        console.error('ID is undefined');
        return null;
    }
    if(!cat) {
        console.error('cat is undefined');
        return null;
    }

    return (
        <div className="container">

            <div className="topicImage">
                <img src={FoodIcon} alt="food icon"/>
            </div>

            <div className="topicText">
                <h1>Wie siehts mit Leckerchen aus? </h1>
            </div>

            <div className="input dropdown">
                <button className="mainButton"
                        onClick={toggleTreats}>Jup
                </button>
                {treats && (
                    <input type="text"
                           placeholder="Wie viel?"
                           value={cat?.treats || ''}
                           onChange={onTreatsInput}/>
                )}
            </div>
            <Link to="/home">
                <button className="secondaryButton"
                        onClick={() => {handleSubmit(id,cat)}}>weiter
                </button>
            </Link>

        </div>
    )
}