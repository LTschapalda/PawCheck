import {Link, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Cat} from "../assets/Cat.ts";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import {getCatById, handleSubmit} from "../assets/FormFunctions.tsx";
import './Input.css'

type TreatPageProps = {
    catsOwned: Cat[];
    editMode: boolean;
    toggleEditMode: () => void;
    getCatsFromUser : () => void;
}
export default function TreatPage(props : TreatPageProps) {
    //VARIABLES
    const {id} = useParams();
    const [cat, setCat] = useState<Cat | undefined>(undefined);
    useEffect(() => {
        const fetchCat = async () => {
            const catData = await getCatById(id);
            if (catData) {
                setCat(catData);
            } else {
                console.error('Failed to fetch cat');
            }
        };
        fetchCat();
    }, [id]);

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
                console.log(cat)
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
        handleSubmit(id,cat, props.getCatsFromUser);
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
            <Link to="/home">
                <button className="secondaryButton weiter"
                        onClick={handleSubmitLocally}>weiter
                </button>
            </Link>


        </div>
    )
}