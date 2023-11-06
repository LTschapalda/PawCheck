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
    console.log(selectedCat)
    const [addCategories, setAddCategories] = useState(false)
    const toggleAddCategories = () => {
        setAddCategories(!addCategories);
    }

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

    function onKeyDown (e:React.KeyboardEvent<HTMLDivElement>){
            if (e.key === 'Enter' || e.key === 'Space') {
                props.toggleEditMode();
            }
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
                        <div className="catName" onClick={() => props.toggleEditMode() }
                             onKeyDown={onKeyDown}
                             tabIndex={0}>
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
                {selectedCat?.treats && (
                    <Link to={`/cat/treats/${selectedCat.id}`}>
                        <div className="catName" onClick={() => props.toggleEditMode() }
                             onKeyDown={onKeyDown} tabIndex={0}>
                            <div>
                                <h4>Leckerlies</h4>
                                <p>{selectedCat?.treats}</p>
                            </div>
                        </div>
                    </Link>
                )}
                <div className="bottomSpace"/>
            </div>

            <button id="deleteCat" className="deleteCat"
                 onClick={toggleDeleteConfirmation}>Löschen
            </button>

            <div className="addCat" onClick={toggleAddCategories}>
                <svg id="plus" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.8966 2V25M25 13.3708H2" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>



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