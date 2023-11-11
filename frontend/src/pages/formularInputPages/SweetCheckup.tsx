import {Link, useParams} from "react-router-dom";

export default function SweetCheckup() {
    const {id} = useParams();
    return (
        <div className="scrollbar">
            <div className="container">
                <div className="topic">
                    <h2>Sweet, hast du Lust direkt eine Checkliste zu erstellen?</h2>
                    <p>Beantworte im Folgenden ein paar kurze Fragen und erhalte in weniger als 5 min deine Checkliste
                        :)</p>
                </div>
                <div className="weiter">
                    <Link to={`/cat/food/${id}`}>
                        <button className="mainButton">Klaro</button>
                    </Link>
                    <Link to={'/home'}>
                        <button className="secondaryButton">später</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}