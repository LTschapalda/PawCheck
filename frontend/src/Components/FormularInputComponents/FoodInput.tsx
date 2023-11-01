import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";
import FoodIcon from "../../assets/Kategorie_Icons_food.png";
import './Input.css'

type FoodInputProps = {
    cat: Cat
    setCat: React.Dispatch<React.SetStateAction<Cat>>;
}

export default function FoodInput(props: FoodInputProps) {
    //FOLD DOWN SELECTION OPERATORS
    const [dryFood, setDryFood] = useState(false)
    const toggleDryFood = () => {
        setDryFood(!dryFood);
    }
    const [dryMorning, setDryMorning] = useState(false)
    const toggleDryMorning = () => {
        setDryMorning(!dryMorning);
    }
    function onDryFoodMorningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, dry: {morning: event.target.value}});
    }

    const [dryEvening, setDryEvening] = useState(false)
    const toggleDryEvening = () => {
        setDryEvening(!dryEvening)
    }

    function onDryFoodEveningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, dry: {evening: event.target.value}});
    }

    const [wetFood, setWetFood] = useState(false)
    const toggleWetFood = () => {
        setWetFood(!wetFood);
    }
    const [wetMorning, setWetMorning] = useState(false)
    const toggleWetMorning = () => {
        setWetMorning(!wetMorning)
    }

    function onWetFoodMorningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, wet: {morning: event.target.value}});
    }

    const [wetEvening, setWetEvening] = useState(false)
    const toggleWetEvening = () => {
        setWetEvening(!wetEvening);
    }

    function onWetFoodEveningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat({...props.cat, wet: {evening: event.target.value}});
    }

    //SUBMIT TO BACKEND
    const [doYouReallyWantToContinue, setDoYouReallyWantToContinue] = useState(false)
    const toggleDoYouReallyWantToContinue = () => {
        setDoYouReallyWantToContinue(!doYouReallyWantToContinue);
    }
    function allInputsAreEmpty (){
        return props.cat.dry?.morning == null
            && props.cat.dry?.evening == null
            && props.cat.wet?.morning == null
            && props.cat.wet?.evening == null;
    }

    const handleSubmit = () => {
                axios.put("/api/cat/" + props.cat.id, props.cat)
                    .then((response: { data: string; }) => {
                        console.log('Erfolgreich upgedatet:' + response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

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
                                {!dryMorning ?
                                    <button className="mainButton mainButtonLighter"
                                            onClick={toggleDryMorning}>Morgens
                                    </button>
                                    :
                                    <div className="secondaryButton border">
                                        <label onClick={toggleDryMorning}>Morgens</label>
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.dry?.morning || ''}
                                            onChange={onDryFoodMorningAmount}/>
                                    </div>
                                }
                                {!dryEvening ?
                                    <button className="mainButton mainButtonLighter"
                                            onClick={toggleDryEvening}>Abends
                                    </button>
                                    :
                                    <div className="secondaryButton border">
                                        <label onClick={toggleDryEvening}>Abends</label>
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.dry?.evening || ''}
                                            onChange={onDryFoodEveningAmount}/>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    <div>
                        <button className="mainButton" onClick={toggleWetFood}>Nassfutter</button>
                        {wetFood && (
                            <div>
                                {!wetMorning ?
                                    <button className="mainButton mainButtonLighter"
                                            onClick={toggleWetMorning}>Morgens
                                    </button>
                                    :
                                    <div className="secondaryButton border">
                                        <label onClick={toggleWetMorning}>Morgens</label>
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.wet?.morning || ''}
                                            onChange={onWetFoodMorningAmount}/>
                                    </div>
                                }
                                {!wetEvening ?
                                    <button className="mainButton mainButtonLighter"
                                            onClick={toggleWetEvening}>Abends
                                    </button>
                                    :
                                    <div className="secondaryButton border">
                                        <label onClick={toggleWetEvening}>Abends</label>
                                        <input
                                            type="text"
                                            placeholder="Wie viel?"
                                            value={props.cat?.wet?.evening || ''}
                                            onChange={onWetFoodEveningAmount}/>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    {allInputsAreEmpty() ? <>
                        <button className="secondaryButton" onClick={toggleDoYouReallyWantToContinue}>weiter</button>
                        {doYouReallyWantToContinue && (
                            <div className="deleteConfirmationPopup">
                                <div className="overlay">
                                    <div className="deleteConfirmationPopup-content">
                                        <h3>Deine Katze isst nichts?</h3>
                                        <button className="mainButton"
                                                onClick={toggleDoYouReallyWantToContinue}>Ups, doch!</button>
                                        <button className="secondaryButton"
                                                onClick={handleSubmit}>Ne, sie ist auf Diet</button>
                                    </div>
                                </div>
                            </div>
                        )}</>
                        :
                        <Link to="/home">
                            <button className="secondaryButton"
                                    onClick={handleSubmit}>weiter
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}
