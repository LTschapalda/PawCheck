import CatFace from "../../assets/ImagePlaceholder.png";
import {useNavigate, useParams} from "react-router-dom";
import {Cat} from "../assets/Cat.ts";
import axios from "axios";

type CatDetailProps = {
    catsOwned : Cat[]
}
export default function CatDetailPage( props: CatDetailProps) {

    const { id } = useParams();
    const navigate = useNavigate()
    const selectedCat = props.catsOwned.find((cat: Cat) => cat.id == id)

    function deleteCatEverywhere () {
        axios.delete("/api/cat/" + id)
            .then(() => {
                navigate("/home")
            })
    }

    return(
        <>
            <div className="catImage">
                <img id="catFaceBigger"
                     src={CatFace}
                     alt="catface"/>
            </div>
            {selectedCat ? (
                <div className="catDetails">{selectedCat.name}</div>
            ) : (
                <div className="catDetails">Katze nicht gefunden</div>
            )}
            <div className="deleteCat"
                 onClick={deleteCatEverywhere}>löschen</div>
        </>
    )
}