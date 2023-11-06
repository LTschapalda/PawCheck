import CategoryCard from "./CategorieCard.tsx";
import FoodIcon from "../../../assets/Kategorie_Icons_food copy.png"
import {Cat} from "../../assets/Cat.ts";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

type AddCategoriesOrDeleteProps = {
    selectedCat? : Cat,
    toggleAddCategories : () => void;
    toggleEditMode : () => void;
}
export default function AddCategoriesOrDelete(props : AddCategoriesOrDeleteProps) {
    const navigate = useNavigate()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const toggleDeleteConfirmation = () => {
        setDeleteConfirmation(!deleteConfirmation);
    }

    //POP-UP CSS
    if(deleteConfirmation) {
        document.body.classList.add('active-deleteConfirmation')
    } else {
        document.body.classList.remove('active-deleteConfirmation')
    }

    //FUNCTIONS
    function deleteCatEverywhere () {
        axios.delete("/api/cat/" + props.selectedCat?.id)
            .then(() => {
                navigate("/home")
            })
    }

    return(
        <>
            {deleteConfirmation && (
                <div className="deleteConfirmationPopup">
                    <div className="overlay">
                        <div className="deleteConfirmationPopup-content">
                            <h3>Willst du diese Katze wirklich endgültig löschen?</h3>
                            <button className="mainButton"
                                    onClick={toggleDeleteConfirmation}>Abort!</button>
                            <button className="secondaryButton"
                                    onClick={deleteCatEverywhere}>Ja, ich bin sicher</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="addCategoryPopup">
                <div style={{ float: 'right'}} onClick={props.toggleAddCategories}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 5L19 19M5 19L19 5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h4>Kategorien hinzufügen:</h4>
                <div className="categoryIcons">
                    {!props.selectedCat?.dry || !props.selectedCat?.wet ?
                        <div onClick={props.toggleEditMode}>
                            <Link to={`/cat/food/${props.selectedCat?.id}`}>
                                <CategoryCard image={FoodIcon}
                                              categoryTitle="Essen"/>
                            </Link>
                        </div>
                        :<div/>}
                    {!props.selectedCat?.treats && (
                        <div onClick={props.toggleEditMode}>
                            <Link to={`/cat/treats/${props.selectedCat?.id}`}>
                                <CategoryCard image={FoodIcon} categoryTitle="Leckerlies"/>
                            </Link>
                        </div>
                    )}
                </div>
                <button id="deleteCat" className="secondaryButton löschen"
                        onClick={toggleDeleteConfirmation}>Katze löschen
                </button>
            </div>
        </>
    )
}