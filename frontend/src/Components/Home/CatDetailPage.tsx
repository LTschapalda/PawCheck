import CatFace from "../../assets/ImagePlaceholder.png";
import {useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";
import {useState} from "react";

type CatDetailProps = {
    catsOwned : Cat[]
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
            </div>
            <div id="deleteCat" className="deleteCat"
                 onClick={toggleDeleteConfirmation}>Löschen
            </div>

            {deleteConfirmation && (
                <div className="deleteConfirmationPopup">
                    <div onClick={toggleDeleteConfirmation} className="overlay"></div>
                    <div className="deleteConfirmationPopup-content">
                        <h3>Willst du diese Katze wirklich endgültig löschen?</h3>
                        <button className="mainButton"
                                onClick={toggleDeleteConfirmation}>Abort!</button>
                        <button className="secondaryButton"
                                onClick={deleteCatEverywhere}>Ja, ich bin sicher</button>
                    </div>
                </div>
            )}
        </>
    )
}