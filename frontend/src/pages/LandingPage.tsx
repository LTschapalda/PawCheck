import {Link} from "react-router-dom";
import PawCheck from "../images/PawCheck.svg"


export default function LandingPage() {
    return (
        <>
            <div className="topic">
                <h1>Bereit für deinen Trip?</h1>
                <p>Let's check, ob deine Katze es auch ist!</p>
            </div>
            <img id="pawcheck" src={PawCheck} alt="PawCheck"/>
            <div className="letsgo">
                <Link to="/cat/name">
                    <button className="mainButton">check in</button>
                </Link>
            </div>
        </>
    )
}