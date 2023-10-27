import CatFace from "../../assets/ImagePlaceholder.png";
import {useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";

type CatDetailProps = {
    catsOwned : Cat[]
}
export default function CatDetailPage( props: CatDetailProps) {

    //VARIABLES
    const { id } = useParams();
    const navigate = useNavigate()
    const selectedCat = props.catsOwned.find((cat: Cat) => cat.id == id)

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
                 onClick={deleteCatEverywhere}>Löschen</div>
        </>
    )
}