import  './SweetCheckup.css'
import {Link, useParams} from "react-router-dom";
export default function SweetCheckup() {
    const { id } = useParams();
    return (
        <div className="container">
            <div className="sweet">
                <h1>Sweet, hast du Lust direkt eine Checkliste zu erstellen?</h1>
                <br/>
                <p>Beantworte im Folgenden ein paar kurze Fragen und erhalte in weniger als 5 min deine Checkliste :)</p>
            </div>
            <div className="input">
                <Link to={`/cat/food/${id}`}>
                    <button className="mainButton">Klaro</button>
                </Link>
                <Link to={'/home'}>
                    <button className="secondaryButton">später</button>
                </Link>
            </div>
        </div>
    )
}