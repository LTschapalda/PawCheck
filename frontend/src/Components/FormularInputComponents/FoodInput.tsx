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
        props.setCat({...props.cat, dry: { morning : event.target.value}});
    }
    function onDryFoodEveningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, dry: {evening: event.target.value}});
    }

    function onWetFoodMorningAmount (event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, wet: {morning: event.target.value}});
    }

    function onWetFoodEveningAmount (event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, wet: {evening: event.target.value}});
    }

    const [wetFood, setWetFood] = useState(false)
    const toggleWetFood = () => {
        setWetFood(!wetFood);
    }

    const [dryFood, setDryFood] = useState(false)
    const toggleDryFood = () => {
        setDryFood(!dryFood);
    }

    const [wetMorning, setWetMorning] = useState(false)
    const toggleWetMorning = () => {
        setWetMorning(!wetMorning)
    }

    const [dryMorning, setDryMorning] = useState(false)
    const toggleDryMorning = () => {
        setDryMorning(!dryMorning);
    }

    const [wetEvening, setWetEvening] = useState(false)
    const toggleWetEvening = () => {
        setWetEvening(!wetEvening);
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

                <div className="catDetails">
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
                                               value={props.cat?.dry?.morning || ''}
                                               onChange={onDryFoodMorningAmount}/>
                                    </div>
                                )}
                                <button className="mainButton mainButtonLighter"
                                        onClick={toggleDryEvening}>Abends</button>

                                {dryEvening && (
                                    <div className="secondaryButton">
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.dry?.evening || ''}
                                            onChange={onDryFoodEveningAmount}/>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        <button className="mainButton" onClick={toggleWetFood}>Nassfutter</button>
                        {wetFood && (
                            <div>
                                <button className="mainButton mainButtonLighter"
                                        onClick={toggleWetMorning}>Morgens</button>

                                {wetMorning && (
                                    <div className="secondaryButton">
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.wet?.morning || ''}
                                            onChange={onWetFoodMorningAmount}/>
                                    </div>
                                )}
                                <button className="mainButton mainButtonLighter"
                                        onClick={toggleWetEvening}>Abends</button>

                                {wetEvening && (
                                    <div className="secondaryButton">
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.wet?.evening || ''}
                                            onChange={onWetFoodEveningAmount}/>
                                    </div>
                                )}
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
