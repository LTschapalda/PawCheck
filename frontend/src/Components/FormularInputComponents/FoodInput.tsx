import {ChangeEvent, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import './Input.css'

type FoodInputProps = {
    catsOwned : Cat[]
}

export default function FoodInput(props: FoodInputProps) {
    const { id } = useParams();
    const currentCat : Cat | undefined = props.catsOwned.find(cat => cat.id === id)
    const [cat, setCat] = useState<Cat>()
    if (currentCat) {
    setCat(currentCat)
    }
    function onDryFoodMorningAmount(event: ChangeEvent<HTMLInputElement>) {
        if (!cat) {
            return;
        }
        setCat({...cat, dry: {timeOfDay: "MORNING", amount: event.target.value}});
    }

    const [dryFood, setDryFood] = useState(false)
    const toggleDryFood = () => {
        setDryFood(!dryFood);
    }
    const [dryMorning, setDryMorning] = useState(false)
    const toggleDryMorning = () => {
        setDryMorning(!dryMorning);
    }

    const [dryEvening, setDryEvening] = useState(false)
    const toggleDryEvening = () => {
        setDryEvening(!dryEvening)
    }


    const handleSubmit = () => {
        axios.put("/api/cat/" + id, cat)
            .then((response: { data: string; }) => {
                console.log('Erfolgreich upgedatet:' + response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <>
            <div className="container">

                <div className="topicImage">
                    <img src={FoodIcon} alt="food icon"/>
                </div>

                <div className="topicText">
                    <h1>Bekommt Mo Trocken oder Nassfutter? </h1>
                </div>

                <div className="selection">
                    <div>
                    <button className="mainButton" onClick={toggleDryFood}>Trockenfutter</button>
                        {dryFood && (
                            <div>
                                <button className="mainButton mainButtonLighter"
                                        onClick={toggleDryMorning}>Morgens</button>

                                {dryMorning && (
                                    <div className="secondaryButton">
                                        <input
                                               type="text"
                                               placeholder="Wie viel?"
                                               value={cat?.dry?.amount}
                                               onChange={onDryFoodMorningAmount}/>
                                    </div>
                                )}
                                <button className="mainButton mainButtonLighter"
                                        onClick={toggleDryEvening}>Abends</button>
                            </div>
                        )}
                    </div>
                    <Link to="/home">
                        <button className="secondaryButton"
                                onClick={handleSubmit}>weiter</button>
                    </Link>
                </div>
            </div>
        </>
    )
}