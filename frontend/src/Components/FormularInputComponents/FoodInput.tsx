import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import './Input.css'

type FoodInputProps = {
    cat : Cat
    setCat : React.Dispatch<React.SetStateAction<Cat>>;
}

export default function FoodInput(props: FoodInputProps) {


    console.log(props.cat)
    function onDryFoodMorningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, dry: {timeOfDay: "MORNING", amount: event.target.value}});
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
        axios.put("/api/cat/" + props.cat.id, props.cat)
            .then((response: { data: string; }) => {
                console.log('Erfolgreich upgedatet:' + response.data);
            })
            .catch((error) => {
                console.log(props.cat)
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
                    <h1>Bekommt {props.cat.name} Trocken oder Nassfutter? </h1>
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
                                               value={props.cat?.dry?.amount || ''}
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
