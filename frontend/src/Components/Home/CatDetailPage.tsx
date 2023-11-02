import CatFace from "../../assets/ImagePlaceholder.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";
import {useState} from "react";
import './Home.css'

type CatDetailProps = {
    catsOwned : Cat[]
    toggleEditMode : () => void;
}
export default function CatDetailPage( props: CatDetailProps) {

    //VARIABLES
    const { id } = useParams();
    const navigate = useNavigate()
    const selectedCat = props.catsOwned.find((cat: Cat) => cat.id == id)

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
        axios.delete("/api/cat/" + id)
            .then(() => {
                navigate("/home")
            })
    }

    //RETURN
    return(
        <>
            <div className="container" >
                <div className="catImage">
                    <img id="catFaceBigger"
                         src={CatFace}
                         alt="catface"/>
                </div>
                {selectedCat ? (
                    <div className="catDetails">
                        <h3>{selectedCat.name}</h3>
                    </div>
                ) : (
                    <div className="catDetails">Katze nicht gefunden</div>
                )}
                {selectedCat?.dry || selectedCat?.wet ? (
                    <Link to={`/cat/food/${selectedCat.id}`}>
                        <div className="catName" onClick={() => props.toggleEditMode()}>
                            {selectedCat?.dry && (
                                <div>
                                    <h4>Trockenfutter</h4>
                                    {selectedCat.dry.morning && (
                                        <p>Morgens : {selectedCat.dry.morning}</p>
                                    )}
                                    {selectedCat.dry.evening && (
                                    <p>Abends : {selectedCat.dry.evening}</p>
                                    )}
                                </div>
                            )}
                            {selectedCat?.wet && (
                                <div>
                                    <h4>Nassfutter</h4>
                                    {selectedCat.wet.morning && (
                                        <p>Morgens : {selectedCat.wet.morning}</p>
                                    )}
                                    {selectedCat.wet.evening && (
                                        <p>Abends : {selectedCat.wet.evening}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </Link>
                ):(<div/>)}
                <div className="bottomSpace"/>
            </div>
            <button id="deleteCat" className="deleteCat"
                 onClick={toggleDeleteConfirmation}>Löschen
            </button>

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
        </>
    )
}