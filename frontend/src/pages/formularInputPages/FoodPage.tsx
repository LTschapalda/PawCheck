import {Link, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import FoodIcon from "../../images/Kategorie_Icons_food.png";
import './styling/Input.css'
import {handleSubmit} from "../assets/FormFunctions.tsx";
import MorningEveningInputField from "./components/MorningEveningInputField.tsx";
import {Cat} from "../assets/Cat.ts";

type FoodPageProps = {
    readonly editMode: boolean;
    readonly toggleEditMode: () => void;
    readonly cat? : Cat;
    readonly setCat :  React.Dispatch<React.SetStateAction<Cat | undefined>>;
    readonly getCatById : (id: string) => undefined;
    readonly getCatsFromUser : () => void;
}
export default function FoodPage(props: FoodPageProps) {
    //VARIABLES
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
        props.getCatById(id)
        }
    }, []);

    //FOLD DOWN SELECTION OPERATORS
    type MealType = 'dry' | 'wet';

    const updateMealAmount = (mealType: MealType, period: 'morning' | 'evening', event: ChangeEvent<HTMLInputElement>) => {
        props.setCat((prevCat: Cat | undefined) => {
            if (!prevCat) {
                return {
                    [mealType]: { [period]: event.target.value },
                    id: '',
                    name: '',
                };
            }

            return {
                ...prevCat,
                [mealType]: {
                    ...prevCat[mealType],
                    [period]: event.target.value,
                },
            };
        });
    };

// Verwendung
    const onDryFoodMorningAmount = (event: ChangeEvent<HTMLInputElement>) => {
        updateMealAmount('dry', 'morning', event);
    };

    const onDryFoodEveningAmount = (event: ChangeEvent<HTMLInputElement>) => {
        updateMealAmount('dry', 'evening', event);
    };

    const onWetFoodMorningAmount = (event: ChangeEvent<HTMLInputElement>) => {
        updateMealAmount('wet', 'morning', event);
    };


    function onWetFoodEveningAmount(event: ChangeEvent<HTMLInputElement>) {
        props.setCat((prevCat: Cat | undefined) => {
            if (!prevCat) {
                return {
                    wet: {evening: event.target.value},
                    id: '',
                    name: '',
                };
            }
            return {
                ...prevCat,
                wet: {
                    ...prevCat.wet,
                    evening: event.target.value,
                },
            };
        });
    }

    //SUBMIT TO BACKEND
    const [doYouReallyWantToContinue, setDoYouReallyWantToContinue] = useState(false)
    const toggleDoYouReallyWantToContinue = () => {
        setDoYouReallyWantToContinue(!doYouReallyWantToContinue);
    }

    function allInputsAreEmpty() {
        return (
            (props.cat?.dry?.morning == null || props.cat?.dry?.morning === '') &&
            (props.cat?.dry?.evening == null || props.cat?.dry?.evening === '') &&
            (props.cat?.wet?.morning == null || props.cat?.wet?.morning === '') &&
            (props.cat?.wet?.evening == null || props.cat?.wet?.evening === '')
        );
    }

    function handleSubmitLocally() {
        if (!id) {
            console.error('ID is undefined');
            return null;
        }
        if(!props.cat) {
            console.error('cat is undefined');
            return null;
        }
        handleSubmit(id,props.cat,
            props.getCatsFromUser,
            ()=> {
                if (!props.editMode) {
                    navigate(`/cat/treats/${id}`);
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
                <h1>Bekommt {props.cat?.name} Trocken oder Nassfutter? </h1>
            </div>

            <div className="catDetails">
                <MorningEveningInputField onMorningInputChange={onDryFoodMorningAmount}
                                          onEveningInputChange={onDryFoodEveningAmount}
                                          buttonText="Trockenfutter"
                                          valueMorning={props.cat?.dry?.morning ?? ''}
                                          valueEvening={props.cat?.dry?.evening ?? ''}
                                          placeholder="Wie viel?"
                />
                <MorningEveningInputField onMorningInputChange={onWetFoodMorningAmount}
                                          onEveningInputChange={onWetFoodEveningAmount}
                                          buttonText="Nassfutter"
                                          valueMorning={props.cat?.wet?.morning ?? ''}
                                          valueEvening={props.cat?.wet?.evening ?? ''}
                                          placeholder="Wie viel?"
                />

                {props.editMode ?
                    <button className="secondaryButton"
                            onClick={handleSubmitLocally}
                    >Speichern</button>
                    : <div>
                        {allInputsAreEmpty() ? <>
                                <button className="secondaryButton"
                                        onClick={toggleDoYouReallyWantToContinue}
                                >weiter</button>
                                {doYouReallyWantToContinue && (
                                    <div className="deleteConfirmationPopup">
                                        <div className="overlay">
                                            <div className="deleteConfirmationPopup-content">
                                                <h3>Deine Katze isst nichts?</h3>
                                                <button className="mainButton"
                                                        onClick={toggleDoYouReallyWantToContinue}>Ups, doch!
                                                </button>
                                                <Link to={"/cat/treats/:id"}>
                                                    <button className="secondaryButton"
                                                            onClick={handleSubmitLocally}>Ne, sie ist auf Diet
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}</>
                            :
                            <button className="secondaryButton"
                                    onClick={handleSubmitLocally}>weiter
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}